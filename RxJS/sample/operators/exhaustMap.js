/**
 * exhaustMap
 * 
 */

const { interval, merge, of } = require('rxjs');
const { delay, take, exhaustMap } = require('rxjs/operators');

// -------------------------------------------------
const sourceInterval = interval(1000);
const delayedInterval = sourceInterval
    .pipe(
        delay(10),
        take(4)
    )

merge(
    delayedInterval,
    of(true)
)
    .pipe(
        exhaustMap(_ => sourceInterval.pipe(take(5)))
    )
    .subscribe(x => console.log(x))


// 結果
// 0
// 1
// 2
// 3
// 4

