/**
 * take
 * 流れてくる値のうち、引数で指定した回数だけ受け取る
 */

const { interval } = require('rxjs');
const { take } = require('rxjs/operators');

// -------------------------------------------------
interval(1000)
    .pipe(
        take(5)
    )
    .subscribe(x => console.log(x));

// 結果
// 0
// 1
// 2
// 3
// 4
