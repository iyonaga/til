<?php

//ini_set('memory_limit', '1024M');

require_once dirname(__FILE__).'/vendor/autoload.php';

use Google\Cloud\BigQuery\BigQueryClient;

date_default_timezone_set('Asia/Tokyo');

$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();


/**
 * using Phirehose to display a live filtered stream using track words
 */
class FilterTrackConsumer extends Phirehose
{

	/**
	 * Subclass specific constants
	 */
	const QUEUE_FILE_PREFIX = 'phirehose-ghettoqueue';
	const QUEUE_FILE_ACTIVE = '.phirehose-ghettoqueue.current';


	/**
	 * Member attributes specific to this subclass
	 */
	protected $queueDir;
	protected $rotateInterval;
	protected $streamFile;
	protected $statusStream;
	protected $lastRotated;
	protected $rows = [];

	//protected $URL_BASE = 'https://api.nazuki-oto.com/stream/filter';
	protected $URL_BASE = 'http://localhost:1323/';


	/**
	 * Overide constructor
	 *
	 * @param string $username
	 * @param string $password
	 * @param string $queueDir
	 * @param integer $rotateInterval
	 */
	public function __construct($username, $password, $queueDir = '/tmp', $rotateInterval = 20)
	{
		// Sanity check
		if ($rotateInterval < 5) {
			throw new Exception('Rotate interval set too low - Must be >= 5 seconds');
		}
		// Set subclass parameters
		$this->queueDir = $queueDir;
		$this->rotateInterval = $rotateInterval;
		// Call parent constructor
		return parent::__construct($username, $password, Phirehose::METHOD_SAMPLE);
	}

	protected function connect()
	{
		// Init state
		$connectFailures = 0;
		$tcpRetry = $this->tcpBackoff / 2;
		$httpRetry = $this->httpBackoff / 2;
		// Keep trying until connected (or max connect failures exceeded)
		do {
			// Check filter predicates for every connect (for filter method)
			if ($this->method == self::METHOD_FILTER) {
				$this->checkFilterPredicates();
			}

			// Construct URL/HTTP bits
			//$url = $this->URL_BASE . $this->method . '.' . $this->format;
			$url = $this->URL_BASE;
			$urlParts = parse_url($url);
			// var_dump($urlParts);

			// Setup params appropriately
			$requestParams=array();

			//$requestParams['delimited'] = 'length';    //No, we don't want this any more
			// Setup the language of the stream
			if($this->lang) {
				$requestParams['language'] = $this->lang;
			}

			// Filter takes additional parameters
			if (count($this->trackWords) > 0) {
				$requestParams['track'] = implode(',', $this->trackWords);
			}

			// Debugging is useful
			$this->log('Connecting to twitter stream: ' . $url . ' with params: ' . str_replace("\n", '',
						var_export($requestParams, TRUE)));

			/**
			 * Open socket connection to make POST request. It'd be nice to use stream_context_create with the native
			 * HTTP transport but it hides/abstracts too many required bits (like HTTP error responses).
			 */
			$errNo = $errStr = NULL;
			$scheme = ($urlParts['scheme'] == 'https') ? 'ssl://' : 'tcp://';
			//$port = ($urlParts['scheme'] == 'https') ? $this->secureHostPort : $this->hostPort;
			$port = $urlParts['port'];

			$this->log("Connecting to {$scheme}{$urlParts['host']}, port={$port}, connectTimeout={$this->connectTimeout}");

			//@$this->conn = fsockopen($scheme . $urlParts['host'], $port, $errNo, $errStr, $this->connectTimeout);
			@$this->conn = fsockopen($urlParts['host'], $port, $errNo, $errStr, $this->connectTimeout);

			// No go - handle errors/backoff
			if (!$this->conn || !is_resource($this->conn)) {
				$this->lastErrorMsg = $errStr;
				$this->lastErrorNo = $errNo;
				$connectFailures++;
				if ($connectFailures > $this->connectFailuresMax) {
					$msg = 'TCP failure limit exceeded with ' . $connectFailures . ' failures. Last error: ' . $errStr;
					$this->log($msg,'error');
					throw new PhirehoseConnectLimitExceeded($msg, $errNo); // Throw an exception for other code to handle
				}
				// Increase retry/backoff up to max
				$tcpRetry = ($tcpRetry < $this->tcpBackoffMax) ? $tcpRetry * 2 : $this->tcpBackoffMax;
				$this->log('TCP failure ' . $connectFailures . ' of ' . $this->connectFailuresMax . ' connecting to stream: ' .
						$errStr . ' (' . $errNo . '). Sleeping for ' . $tcpRetry . ' seconds.','info');
				sleep($tcpRetry);
				continue;
			}

			// TCP connect OK, clear last error (if present)
			$this->log('Connection established to ' . $urlParts['host']);
			$this->lastErrorMsg = NULL;
			$this->lastErrorNo = NULL;

			// If we have a socket connection, we can attempt a HTTP request - Ensure blocking read for the moment
			stream_set_blocking($this->conn, 1);

			// Encode request data
			$postData = http_build_query($requestParams, NULL, '&');
			$postData = str_replace('+','%20',$postData); //Change it from RFC1738 to RFC3986 (see
			//enc_type parameter in http://php.net/http_build_query and note that enc_type is
			//not available as of php 5.3)
			$authCredentials = $this->getAuthorizationHeader($url,$requestParams);

			// Do it
			$s = "POST " . $urlParts['path'] . " HTTP/1.1\r\n";
			$s.= "Host: " . $urlParts['host'] . ':' . $port . "\r\n";
			$s .= "Connection: Close\r\n";
			$s.= "Content-type: application/x-www-form-urlencoded\r\n";
			$s.= "Content-length: " . strlen($postData) . "\r\n";
			$s.= "Accept: */*\r\n";
			$s.= 'Authorization: ' . $authCredentials . "\r\n";
			$s.= 'User-Agent: ' . $this->userAgent . "\r\n";
			$s.= "\r\n";
			$s.= $postData . "\r\n";
			$s.= "\r\n";

			fwrite($this->conn, $s);
			$this->log($s);

			// First line is response
			list($httpVer, $httpCode, $httpMessage) = preg_split('/\s+/', trim(fgets($this->conn, 1024)), 3);

			// Response buffers
			$respHeaders = $respBody = '';
			$isChunking = false;
			// Consume each header response line until we get to body
			while ($hLine = trim(fgets($this->conn, 4096))) {
				$respHeaders .= $hLine."\n";
				if(strtolower($hLine) == 'transfer-encoding: chunked') $isChunking = true;
			}

			// If we got a non-200 response, we need to backoff and retry
			if ($httpCode != 200) {
				$connectFailures++;

				// Twitter will disconnect on error, but we want to consume the rest of the response body (which is useful)
				//TODO: this might be chunked too? In which case this contains some bad characters??
				while ($bLine = trim(fgets($this->conn, 4096))) {
					$respBody .= $bLine;
				}

				// Construct error
				$errStr = 'HTTP ERROR ' . $httpCode . ': ' . $httpMessage . ' (' . $respBody . ')';

						// Set last error state
						$this->lastErrorMsg = $errStr;
						$this->lastErrorNo = $httpCode;

						// Have we exceeded maximum failures?
						if ($connectFailures > $this->connectFailuresMax) {
						$msg = 'Connection failure limit exceeded with ' . $connectFailures . ' failures. Last error: ' . $errStr;
						$this->log($msg,'error');
						throw new PhirehoseConnectLimitExceeded($msg, $httpCode); // We eventually throw an exception for other code to handle
						}
						// Increase retry/backoff up to max
						$httpRetry = ($httpRetry < $this->httpBackoffMax) ? $httpRetry * 2 : $this->httpBackoffMax;
						$this->log('HTTP failure ' . $connectFailures . ' of ' . $this->connectFailuresMax . ' connecting to stream: ' .
							$errStr . '. Sleeping for ' . $httpRetry . ' seconds.','info');
						sleep($httpRetry);
						continue;

						} // End if not http 200
						else{
							if(!$isChunking)throw new Exception("Twitter did not send a chunking header. Is this really HTTP/1.1? Here are headers:\n$respHeaders");   //TODO: rather crude!
						}
						// Loop until connected OK
		} while (!is_resource($this->conn) || $httpCode != 200);

		// Connected OK, reset connect failures
		$connectFailures = 0;
		$this->lastErrorMsg = NULL;
		$this->lastErrorNo = NULL;

		// Switch to non-blocking to consume the stream (important)
		stream_set_blocking($this->conn, 0);

		// Connect always causes the filterChanged status to be cleared
		$this->filterChanged = FALSE;

		// Flush stream buffer & (re)assign fdrPool (for reconnect)
		$this->fdrPool = array($this->conn);
		$this->buff = '';

	}


	protected function getAuthorizationHeader($url,$requestParams)
	{
		$authCredentials = base64_encode($this->username . ':' . $this->password);
		return "Basic: ".$authCredentials;
	}


	/**
	 * Enqueue each status
	 *
	 * @param string $status
	 */
	public function enqueueStatus($status)
	{
		$data = json_decode($status, true);
		$data = json_decode($data, true);

		//error_log(print_r($data, true), 3, '/tmp/php_error.log');

		if (is_array($data) && isset($data['user']['screen_name'])) {
			$row = [
				'data' => [
					'text' => $data['text'],
					'created_at' => date("Y-m-d H:i:s", strtotime($data['created_at'])),
				]
			];

			//var_dump($row['data']['created_at']);

			fputs($this->getStream(), json_encode($row) .PHP_EOL);
			$now = time();

			if (($now - $this->lastRotated) > $this->rotateInterval) {

				$_start = microtime(true);
				echo "start\n";

				$keyFile = getenv('keyFile');
				$projectId = getenv('projectId');
				$datasetName = getenv('dataset');
				$tableName = getenv('table');

				# Instantiates a client
				$bigquery = new BigQueryClient([
						'keyFilePath' => "./${keyFile}",
						'projectId' => $projectId
				]);

				# The name for the new dataset
				$dataset = $bigquery->dataset($datasetName);
				$table = $dataset->table($tableName);

				$f = file_get_contents($this->streamFile);
				$tweets = explode("\n", rtrim($f, "\n"));

				//echo (microtime(true) - $_start). "\n";

				foreach ($tweets as $tweet) {
					$this->rows[] = json_decode($tweet, true);
				}

				echo (microtime(true) - $_start). "\n";

				foreach($this->chunkGenerater($this->rows, 1000) as $chunk) {

					$insertResponse = $table->insertRows($chunk);

					echo (microtime(true) - $_start). "\n";

					if (!$insertResponse->isSuccessful()) {
						$failed = $insertResponse->failedRows()[0];

						print_r($failed['rowData']);

						foreach ($failed['errors'] as $error) {
							echo $failed['reason'] . ': ' . $failed['message'] . PHP_EOL;
						}
					}
				}

				$_time = microtime(true) - $_start;
				echo "{$_time} 秒";

				$this->rows = [];

				// Mark last rotation time as now
				$this->lastRotated = $now;

				// Rotate it
				$this->rotateStreamFile();
			}
		}

		// global $time_start;
		// $time = microtime(true) - $time_start;
		// if ($time > 1) {
		// 	echo "{$time} 秒";
		// 	die();
		// }
	}


	/**
	 * Devide an array into chunks
	 *
	 * @return \Generator<array>
	 */
	private function chunkGenerater($array, $size, $preserveKeys = false) {
		$i = 0;
    while (true) {
        $offset = $size * $i++;
        $sliced = array_slice($array, $offset, $size, $preserveKeys);

        if (count($sliced) === 0) {
            break;
        }

        yield $sliced;
    }
	}

	/**
	 * Returns a stream resource for the current file being written/enqueued to
	 *
	 * @return resource
	 */
	private function getStream()
	{
		// If we have a valid stream, return it
		if (is_resource($this->statusStream)) {
			return $this->statusStream;
		}
		// If it's not a valid resource, we need to create one
		if (!is_dir($this->queueDir) || !is_writable($this->queueDir)) {
			throw new Exception('Unable to write to queueDir: ' . $this->queueDir);
		}

		// Construct stream file name, log and open
		$this->streamFile = $this->queueDir . '/' . self::QUEUE_FILE_ACTIVE;
		$this->log('Opening new active status stream: ' . $this->streamFile);
		$this->statusStream = fopen($this->streamFile, 'a'); // Append if present (crash recovery)
		// Ok?
		if (!is_resource($this->statusStream)) {
			throw new Exception('Unable to open stream file for writing: ' . $this->streamFile);
		}
		// If we don't have a last rotated time, it's effectively now
		if ($this->lastRotated == NULL) {
			$this->lastRotated = time();
		}
		// Looking good, return the resource
		return $this->statusStream;
	}


	/**
	 * Rotates the stream file if due
	 */
	private function rotateStreamFile()
	{
		// Close the stream
		fclose($this->statusStream);
		// Create queue file with timestamp so they're both unique and naturally ordered
		$queueFile = $this->queueDir . '/' . self::QUEUE_FILE_PREFIX . '.' . date('Ymd-His') . '.queue';
		// Do the rotate
		rename($this->streamFile, $queueFile);
		// Did it work?
		if (!file_exists($queueFile)) {
			throw new Exception('Failed to rotate queue file to: ' . $queueFile);
		}
		// At this point, all looking good - the next call to getStream() will create a new active file
		$this->log('Successfully rotated active stream to queue file: ' . $queueFile);
	}
}


// $username = getenv('username');
// $password = getenv('password');
$username = "hoge";
$password = "fuga";

$sc = new FilterTrackConsumer($username, $password, '/tmp', 10);

$sc->setTrack([
	// 'バルス',
	// 'パズー',
	// 'シータ',
	// 'ドーラ',
	// 'ムスカ'
]);



$time_start = microtime(true);

$sc->consume(false);

$time = microtime(true) - $time_start;
echo "{$time} 秒";
