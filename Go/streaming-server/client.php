<?php
// https://qiita.com/mpyw/items/b59d3ce03f08be126000#%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0api%E3%81%B8%E3%81%AE%E5%AF%BE%E5%BF%9C
$url = 'http://localhost:1323';

$callback = function($ch, $str) {
  var_dump($str);
  sleep(1);

  // static $buffer = '';
  // $buffer .= $str;
  //
  // // デコード可能な状態であるか(末尾が改行コードであるか)
  // if ($buffer[strlen($buffer) - 1] === "\n") {
  //   if (null !== $obj = json_decode($buffer)) {
  //     $info = curl_getinfo($ch);
  //     if (preg_match("@Reason:\n<pre>([^<]++)</pre>@", $buffer, $matches)) {
  //       // レスポンスがHTML形式のエラーである場合
  //       throw new RuntimeException(trim($matches[1]), $info['http_code']);
  //     }
  //     if (strip_tags($buffer) === $buffer) {
  //       // レスポンスがテキスト形式のエラーである場合
  //       throw new RuntimeException(trim($buffer), $info['http_code']);
  //     }
  //     // 形式不明のレスポンスであった
  //     throw new RuntimeException('Malformed response detected.', $info['http_code']);
  //   }
  //
  //   if (isset($obj->disconnect)) {
  //     // レスポンスがJSON形式だが切断されたことを意味する場合
  //     $info = curl_getinfo($ch);
  //     throw new RuntimeException($obj->disconnect->reason, $info['http_code']);
  //   };
  //   // メッセージを使って目的の処理を行う（ここではダンプしている）
  //   var_dump($buffer);
  //   // バッファを空にする
  //   $buffer = '';
  // }

  // 追記された長さを返す
  return strlen($str);
};

$ch = curl_init();

$option = [
  CURLOPT_URL            => $url,
  CURLOPT_SSL_VERIFYPEER => false,
  CURLOPT_HTTPHEADER     => [$header],
  CURLOPT_ENCODING       => 'gzip',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT        => 0,
  CURLOPT_WRITEFUNCTION  => $callback,
];

curl_setopt_array($ch, $option);

curl_exec($ch);
