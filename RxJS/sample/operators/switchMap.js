/**
 * switchMap
 * 新しいストリームを返す。
 * 前の非同期処理が解決する前に次の処理が流れてくると前のものはキャンセルされる
 */

const { of, interval } = require('rxjs');
const { switchMap, fromEvent } = require('rxjs/operators');

// -------------------------------------------------
of(1, 2, 3)
    .pipe(
        switchMap(x => of(x, x ** 2, x ** 3))
    )
    .subscribe(x => console.log(x));

// 結果
// 1
// 1
// 1
// 2
// 4
// 8
// 3
// 9
// 27


// -------------------------------------------------
fromEvent(document, 'click')
    .pipe(
        switchMap(() => interval(1000))
    )
    .subscribe(x => console.log(x));

// 結果
// 0
// 1
// 2
// 0 <- clickしたタイミングでリセットされる
// 1
// ...
