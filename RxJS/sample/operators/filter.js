/**
 * filter
 * trueを返した要素を返す
 */

const { of } = require('rxjs');
const { filter } = require('rxjs/operators');

// -------------------------------------------------
of(0, 1, 2, 3 ,4)
    .pipe(
        filter(x => x % 2 === 0)
    )
    .subscribe(x => console.log(x));

// 結果
// 0
// 2
// 4
