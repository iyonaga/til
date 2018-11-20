<?php

ini_set('memory_limit', '5048M');

require_once dirname(__FILE__).'/vendor/autoload.php';

use Google\Cloud\BigQuery\BigQueryClient;

date_default_timezone_set('Asia/Tokyo');

$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

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


$f = file_get_contents('/tmp/.phirehose-ghettoqueue.current');
$tweets = explode("\n", rtrim($f, "\n"));

foreach ($tweets as $tweet) {
	$rows[] = json_decode($tweet, true);
}


$size = 100;
$size_max = 5100;

for($i = $size; $i < $size_max; $i = $i + 100) {

	echo "=======================\n";
	echo "size:${i}\n";

	$exec_cnt = 0;
	$exec_max = 20;

	foreach(chunkGenerater($rows, $i) as $chunk) {

		$exec_cnt++;

		if ($exec_cnt > $exec_max) {
			break;
		}

		$_start = microtime(true);

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
}

// foreach(chunkGenerater($rows, 1200) as $chunk) {
//
// 	$exec_cnt++;
// 	if ($exec_cnt > $exec_max) {
// 		exit();
// 	}
//
// 	$_start = microtime(true);
//
// 	$insertResponse = $table->insertRows($chunk);
//
// 	echo (microtime(true) - $_start). "\n";
//
//
// 	if (!$insertResponse->isSuccessful()) {
// 		$failed = $insertResponse->failedRows()[0];
//
// 		print_r($failed['rowData']);
//
// 		foreach ($failed['errors'] as $error) {
// 			echo $failed['reason'] . ': ' . $failed['message'] . PHP_EOL;
// 		}
// 	}
// }


function chunkGenerater($array, $size, $preserveKeys = false) {
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
