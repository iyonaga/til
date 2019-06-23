/**
 * ignoreElements
 * errorとcomplete以外は無視する
 */

const { interval } = require('rxjs');
const { take, ignoreElements } = require('rxjs/operators');

// -------------------------------------------------
interval(1000)
    .pipe(
        take(5),
        ignoreElements()
    )
    .subscribe(
        x => console.log(`NEXT: ${x}`),
        x => console.log(`ERROR: ${x}`),
        () => console.log(`COMPLETE`)
    )

// 結果
// COMPLETE
