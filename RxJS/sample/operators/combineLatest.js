/**
 * combineLatest
 * 可変長引数で複数のObservableを受け取り、
 * 各Observableに値が流れる度に他のObservableの直近の値も一緒に流す。
 * 全てのObservableが最初の値を流しはじめるまで結果値が流れてこない点に注意
 */

const { interval, combineLatest } = require('rxjs');
const { map, take } = require('rxjs/operators');

// -------------------------------------------------
const numbers = interval(1000).pipe(take(5));

const letters = interval(1500).pipe(
    take(5),
    map(index => 'ABCDEFG'[index])
);

combineLatest(
    numbers,
    letters,
    (num, letter) => num + letter
)
    .subscribe(x => console.log(x));

// これでもOK
// combineLatest(
//     numbers,
//     letters
// )
//     .pipe(
//        map(([num, letter]) => num + letter)
//     )
//     .subscribe(x => console.log(x));

// 結果
// 0A
// 1A
// 1B
// 2B
// 3B
// 3C
// 4C
// 4D
// 4E

// 1  秒後 -> num = 0, letter =   letterがないので出力されない 
// 1.5秒後 -> num = 0, letter = A
// 2  秒後 -> num = 1, letter = A
// 3  秒後 -> num = 1, letter = B
// 3  秒後 -> num = 2, letter = B
// 4  秒後 -> num = 3, letter = B
// 4.5秒後 -> num = 3, letter = C
// 5  秒後 -> num = 4, letter = C
// 6  秒後 -> num = 4, letter = D
// 7.5秒後 -> num = 4, letter = E
