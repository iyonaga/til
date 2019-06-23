/**
 * concatMap, mergeMap, switchMap, exhaustMapの違い
 */

const { Subject } = require('rxjs');
const { concatMap, mergeMap, switchMap,  exhaustMap, map } = require('rxjs/operators');
 
console.log('start');
 
const subject = new Subject();

subject
    .pipe(
        concatMap(obj => httpGet(obj.url, obj.delay)),
        // mergeMap(obj => httpGet(obj.url, obj.delay)),
        // switchMap(obj => httpGet(obj.url, obj.delay)),
        // exhaustMap(obj => httpGet(obj.url, obj.delay)),
        map(res => JSON.parse(res).ResultData)
    )
    .subscribe(x => console.log(x));

subject.next({ url: 'http://foo', delay: 500 });
subject.next({ url: 'http://bar', delay: 300 });
subject.next({ url: 'http://baz', delay: 100 });

function httpGet (url, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            const obj = { ResultData: `${url} -> resolved` };
            resolve(JSON.stringify(obj))
        }, delay)
    })
}

// 結果
// concatMapの場合
// subject.nextの発行順に並ぶ
// http://foo -> resolved
// http://bar -> resolved
// http://baz -> resolved
//
// mergeMapの場合
// subject.next の発行順は無視され、非同期の解決順（delayの少ない順）で並ぶ
// http://baz -> resolved
// http://bar -> resolved
// http://foo -> resolved
//
// switchMapの場合
// 前の非同期処理が解決する前に次の処理が流れてくると前のものはキャンセルする
// http://baz -> resolved

// exhaustMapの場合
// 前の非同期処理が未解決なら、次のがやって来ても無視する
// http://foo -> resolved
