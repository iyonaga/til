/**
 * mergeMap
 * 新しいストリームを返す
 */

const { of } = require('rxjs');
const { mergeMap } = require('rxjs/operators');

// -------------------------------------------------
of('Hello')
    .pipe(
        mergeMap(val => of(`${val} World!`))
    )
    .subscribe(x => console.log(x));

// 結果
// Hello World!

