/**
 * mergeMapTo
 * mergeMapToは、mergeMapの機能を限定したもの
 * mapToのように流れてきた値は捨てる
 */

const { of } = require('rxjs');
const { mergeMapTo } = require('rxjs/operators');

// -------------------------------------------------
of(1, 2, 3)
    .pipe(
        mergeMapTo(of('a', 'b'))
    )
    .subscribe(x => console.log(x));

// 結果
// a
// b
// a
// b
// a
// b
