/**
 * throttleTime
 * 発生する最初のデータから指定した時間以内のデータを間引き連続されたデータの最後を返す
 */

const { interval } = require('rxjs');
const { throttleTime } = require('rxjs/operators');

// -------------------------------------------------
interval(1000)
    .pipe(
        throttleTime(5000)
    )
    .subscribe(x => console.log(x));

// 結果
// 0
// 5
// 10
// 15
// 20
