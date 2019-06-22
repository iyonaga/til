/**
 * distinctUntilChanged
 * Observableソースから来るすべての値のうち、
 * 前回の値から変化したものだけを流す。
 * 数値や文字列のような値であればdistinctUntilChanged()と記述するだけで良いが、
 * 比較対象がオブジェクトの場合はfilterと同じような比較関数を自前用意する
 */

const { of, from } = require('rxjs');
const { distinctUntilChanged } = require('rxjs/operators');

// -------------------------------------------------
of(0, 1, 1, 2, 2, 3, 3, 4)
    .pipe(
        distinctUntilChanged()
    )
    .subscribe(x => console.log(x));

// 結果
// 0
// 1
// 2
// 3
// 4


// -------------------------------------------------
from([
    { age: 4, name: 'Foo'},
    { age: 7, name: 'Bar'},
    { age: 5, name: 'Foo'},
    { age: 6, name: 'Foo'}
])
    .pipe(
        distinctUntilChanged((prev, current) => prev.name === current.name)
    )
    .subscribe(x => console.log(x));

// 結果
// { age: 4, name: 'Foo' }
// { age: 7, name: 'Bar' }
// { age: 5, name: 'Foo' }