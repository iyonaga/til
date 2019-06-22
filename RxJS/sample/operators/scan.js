/**
 * scan
 * 流れてきた値に何かしらの処理を適用しその結果をObservableとして返す。
 * mapとは違い、前回流れてきた値、すなわち前回までの累積結果も流れてくる
 */

const { of } = require('rxjs');
const { scan } = require('rxjs/operators');

// -------------------------------------------------
of(0, 1, 2, 3 ,4)
    .pipe(
        scan((acc, one) => acc + one)
    )
    .subscribe(x => console.log(x));

// 結果
// 0
// 1
// 3
// 6
// 10
