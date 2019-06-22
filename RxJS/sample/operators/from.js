/**
 * from
 * 配列といったlterableな引数を取りそれらを順番に流すObservableを生成する
 */

const { from } = require('rxjs');

// -------------------------------------------------
from([0, 1, 2, 3 ,4])
    .subscribe(x => console.log(x));

// 結果
// 0
// 1
// 2
// 3
// 4


// -------------------------------------------------
from('hello')
    .subscribe(x => console.log(x));

// 結果
// h
// e
// l
// l
// 0
