/**
 * mergeMap
 * 新しいストリームを返す
 * mergeMapとmapの違いは、mapは単純に値のprojectionなのに対して、
 * mergeMapは値からobservableへのprojectionである点。
 */

const { of, interval } = require('rxjs');
const { mergeMap, map } = require('rxjs/operators');

// -------------------------------------------------
of('Hello')
    .pipe(
        mergeMap(val => of(`${val} World!`))
    )
    .subscribe(x => console.log(x));

// 結果
// Hello World!


// -------------------------------------------------
of('Hello')
    .pipe(
        mergeMap(val => Promise.resolve(val))
    )
    .subscribe(x => console.log(x));


// -------------------------------------------------
of('a', 'b', 'c')
    .pipe(
        mergeMap(x => interval(1000).pipe(map(i => x + i)))
    )
    .subscribe(x => console.log(x));

// 結果
// a0
// b0
// c0
// a1
// b1
// c1


// -------------------------------------------------
of(1, 2, 3)
    .pipe(
        mergeMap(val => of(val * 2, val * 3))
    )
    .subscribe(x => console.log(x))

// 結果
// 2
// 3
// 4
// 6
// 6
// 9


// -------------------------------------------------
of(1, 2, 3)
    .pipe(
        mergeMap(val => of([val, 'a'], [val, 'b'], [val, 'c']))
    )
    .subscribe(x => console.log(x));

// 結果
// [ 1, 'a' ]
// [ 1, 'b' ]
// [ 1, 'c' ]
// [ 2, 'a' ]
// [ 2, 'b' ]
// [ 2, 'c' ]
// [ 3, 'a' ]
// [ 3, 'b' ]
// [ 3, 'c' ]


// -------------------------------------------------
// ↑と同じことを2段階のmergeMapでやる
of(1, 2, 3)
    .pipe(
        mergeMap(val1 => {
            return of('a', 'b', 'c').pipe(
                mergeMap(val2 => of([val1 ,val2]))
            )
        })
    )
    .subscribe(x => console.log(x));
