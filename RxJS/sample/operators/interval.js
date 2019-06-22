/**
 * interval
 * 指定した間隔ごとに値を流すObservableを生成する。
 * 流れてくる値は0, 1, 2... といった整数のシーケンス。
 * 止める場合はSubscription.unsubscribeメソッドを呼び出す
 */

const { interval } = require('rxjs');

// -------------------------------------------------
const intervalSource = interval(1000)
const subscription = intervalSource.subscribe(x => console.log(x));

setTimeout(() => subscription.unsubscribe(), 5000)

// 結果
// 0
// 1
// 2
// 3
