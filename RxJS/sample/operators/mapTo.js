/**
 * mapTo
 * 流れてくる値を毎回同じ固定値にして返す
 */

const { of, from } = require('rxjs');
const { mapTo } = require('rxjs/operators');

// -------------------------------------------------
of(0, 1, 2, 3 ,4)
    .pipe(
        mapTo(1)
    )
    .subscribe(x => console.log(x));

// 結果
// 1
// 1
// 1
// 1
// 1
