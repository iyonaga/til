<?php
$fp = fsockopen('localhost', 1323);
$out = array(
		'POST / HTTP/1.1',
		'Host: localhost',
	);
fwrite($fp, implode($out, "\r\n") . "\r\n\r\n");
ob_start();
fpassthru($fp);
$response = ob_get_clean();
fclose($fp);

$response = explode("\r\n\r\n", $response, 2);
echo 'こっちがヘッダ<pre>' . $response[0] . '</pre>';
echo 'こっちがボディ<pre>' . $response[1] . '</pre>';
