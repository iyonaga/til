/**
 * concatMap
 * mergeMapとほぼ同じ。
 * 違うのは流れてきた値一つに対して生成した内部のObservableが完了してから、
 * 次に流れてくる値を処理する
 */

const { of } = require('rxjs');
const { concatMap, delay, mergeMap } = require('rxjs/operators');

// -------------------------------------------------
of(2000, 1000)
    .pipe(
        concatMap(val => of(`Deleyed by: ${val}ms`).pipe(delay(val)))
    )
    .subscribe(x => console.log(x));

// 結果
// Deleyed by: 2000ms
// Deleyed by: 1000ms


// -------------------------------------------------
// cnocatMapとmergeMapの違い
of(2000, 1000)
    .pipe(
        mergeMap(val => of(`Deleyed by: ${val}ms`).pipe(delay(val)))
    )
    .subscribe(x => console.log(x));

// 結果
// Deleyed by: 1000ms
// Deleyed by: 2000ms


// -------------------------------------------------
of('Hello', 'Goodbye')
    .pipe(
        concatMap(val => {
            return new Promise(resolve => resolve(`${val} World!`))
        })
    )
    .subscribe(x => console.log(x));

// 結果
// Hello World!
// Goodbye World!

// -------------------------------------------------
of('Hello', 'Goodbye')
    .pipe(
        concatMap(val => {
            return new Promise(resolve => resolve(`${val} World!`))
        }, result => `${result} w/ selector!`)
    )
    // .subscribe(x => console.log(x));

// 結果
// Hello w/ selector!
// Goodbye w/ selector!