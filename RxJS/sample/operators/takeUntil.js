/**
 * takeUntil
 * 値が流れたら処理を中断
 */

const { interval, timer } = require('rxjs');
const { takeUntil } = require('rxjs/operators');

// -------------------------------------------------
interval(1000)
    .pipe(
        takeUntil(timer(5000))
    )
    .subscribe(x => console.log(x));

// 結果
// 1秒ごとに0, 1, ... と出力し5秒後に停止
// 0
// 1
// 2
// 3
