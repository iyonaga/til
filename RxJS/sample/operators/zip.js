/**
 * zip
 * 複数のオブザーバを統合して、それぞれから流れてきた値をペアにして流す
 */
const { of, zip } = require('rxjs');
const { map, delay } = require('rxjs/operators');

// -------------------------------------------------
const sourceOne = of('Hello');
const sourceTwo = of('World!');
const sourceThree = of('Goodbye');
const sourceFour = of('World!');

zip(
    sourceOne,
    sourceTwo.pipe(delay(1000)),
    sourceThree.pipe(delay(2000)),
    sourceFour.pipe(delay(3000))
)
    .subscribe(x => console.log(x))

// 結果
// [ 'Hello', 'World!', 'Goodbye', 'World!' ]


// -------------------------------------------------
const age$ = of(27, 25, 29);
const name$ = of('Foo', 'Bar', 'Beer');
const isDev$ = of(true, true, false);
    
zip(age$, name$, isDev$).pipe(
    map(([age, name, isDev]) => ({ age, name, isDev })),
)
.subscribe(x => console.log(x));

// 結果
// { age: 27, name: 'Foo', isDev: true }
// { age: 25, name: 'Bar', isDev: true }
// { age: 29, name: 'Beer', isDev: false }
