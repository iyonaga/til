/**
 * map
 * 任意の関数を流れてくる値に適用し、
 * その戻り値を再びObservableとして返す
 */

const { of, from } = require('rxjs');
const { map } = require('rxjs/operators');

// -------------------------------------------------
of(0, 1, 2, 3 ,4)
    .pipe(
        map(x => x * 2)
    )
    .subscribe(x => console.log(x));

const numbers = of(0, 1, 2, 3, 4);
const example = numbers.pipe(map(x => x * 2));
const subscribe = example.subscribe(x => console.log(x));

// 結果
// 0
// 2
// 4
// 6
// 8


// -------------------------------------------------
from([
    { name: 'Joe', age: 30},
    { name: 'Frank', age: 20},
    { name: 'Ryan', age: 50},
])
    .pipe(map(({name}) => name))
    .subscribe(val => console.log(val));

// 結果
// Joe
// Frank
// Ryan