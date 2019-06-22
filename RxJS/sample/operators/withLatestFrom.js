/**
 * withLatestFrom
 * あるObservableソースからの値にもう一方のObservableソースの最新値を合成するオペレータ。
 * combileLatestと似てるが、withLatestFromは最初に起点となるObservableの
 * 値が流れるタイミングのときだけ発火する
 */

const { interval } = require('rxjs');
const { map, take, withLatestFrom } = require('rxjs/operators');

// -------------------------------------------------
const number$ = interval(1000).pipe(take(5));

const letter$ = interval(1500).pipe(
    take(5),
    map(index => 'ABCDEFG'[index])
);

number$.pipe(
    withLatestFrom(
        letter$,
        (num, letter) => num + letter
    )
)
    .subscribe(x => console.log(x));

// これでもOK
// number$.pipe(
//     withLatestFrom(
//         letter$
//     ),
//     map(([num, letter]) => num + letter) 
// )
//     .subscribe(x => console.log(x));

// 結果
// 1A
// 2B
// 3B
// 4C

// 1  秒後 -> num = 0, letter =   
// 2  秒後 -> num = 1, letter = A
// 3  秒後 -> num = 2, letter = B
// 4  秒後 -> num = 3, letter = B
// 5  秒後 -> num = 4, letter = C