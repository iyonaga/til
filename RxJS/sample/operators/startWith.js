/**
 * startWith
 * 指定した引数の値を最初に返す
 */

const { of } = require('rxjs');
const { startWith } = require('rxjs/operators');

// -------------------------------------------------
of(0, 1, 2, 3 ,4)
    .pipe(
        startWith('hoge')
    )
    .subscribe(x => console.log(x));

// 結果
// hoge
// 0
// 1
// 2
// 3
// 4
