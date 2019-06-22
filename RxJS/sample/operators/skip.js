/**
 * skip
 * 引数で渡したデータの回数分を無視する
 */

const { of } = require('rxjs');
const { skip } = require('rxjs/operators');

// -------------------------------------------------
of(0, 1, 2, 3 ,4)
    .pipe(
        skip(3)
    )
    .subscribe(x => console.log(x));

// 結果
// 3
// 4
