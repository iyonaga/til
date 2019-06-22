/**
 * merge
 * 複数のObservableを受け取り、
 * 各Observableに値が流れてくる度にそれをそのまま流す
 */

const { merge, interval } = require('rxjs');
const { take, mapTo } = require('rxjs/operators');

// -------------------------------------------------
const first = interval(2000);
const second = interval(1000);

merge(
    first.pipe(
        take(2),
        mapTo('first')
    ),
    second.pipe(
        take(2),
        mapTo('second')
    ),
)
    .subscribe(x => console.log(x))

// 結果
// second
// first
// second
// first


// -------------------------------------------------
// 下記のパターンでもいける
const { interval } = require('rxjs');
const { take, merge, mapTo } = require('rxjs/operators');

const first = interval(2000);
const second = interval(1000);

first.pipe(
    take(2),
    mapTo('first'),
    merge(
        second.pipe(
            take(2),
            mapTo('second')
        ),
    )
)
    .subscribe(x => console.log(x))
