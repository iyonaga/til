<?php

$file = new SplFileObject("data2.txt", "w");

for ($i = 0; $i < 1000; $i++) {
  $file->fwrite('{"hoge": "aaaaaaaaaaaa"}'. PHP_EOL);
}
