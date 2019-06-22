/**
 * debounceTime
 * 発生するデータから指定した時間以内のデータを間引き連続されたデータの最後を返す
 */

const { fromEvent } = require('rxjs');
const { debounceTime } = require('rxjs/operators');

// -------------------------------------------------
fromEvent(document, 'click')
    .pipe(
        debounceTime(1000)
    )
    .subscribe(x => console.log(x));

// 結果
// Hello World!

