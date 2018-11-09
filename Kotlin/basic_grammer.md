# 基本文法

- 三項演算子は？ -> ない
- CharとString型の違い

[リファレンス - Kotlin Programming Language](https://dogwood008.github.io/kotlin-web-site-ja/docs/reference/)

## 変数宣言
```kotlin
var num : Int = 1
val num2 : Int = 2
```
varは再代入可能。valは不可能

型は省略可能
```kotlin
var num3 = 3
```

### データ型

- Double
- Float
- Long
- Int
- Short
- Byte
- Char
- Boolean
- Array
- String

## 条件判定
### if文

```kotlin
if (true) {
  println("true")
}
```

Kotlinのifは「式」である。つまり値を返せる。
```kotlin
var result : string = if (true) { "true" } else { "false" }
println(result) // => true
```

### when式
switch文みたいなもの
```kotlin
val value = 1
val str = when(value) {
  1 -> "one"
  2 -> "two"
  else -> "other"
}
```

左側を条件式にすることも可能
```kotlin
val value = 1
when {
  value == 1 -> println("one")
  value == 2 -> println("two")
  else -> println("other")
}
```

条件の複数指定や範囲指定
```kotlin
val value = 13
when(value) {
  in 1..10 -> println("1..10")
  11, 12 -> println("11 or 12")
  in 13..20 -> println("13..20")
  !in 1..20 -> println("else")
}
```

引数なしのwhen
条件式を上から評価し、最初に合致した条件のみ処理する
```kotlin
val value = 13
val value2 = 5
when {
  value < 20 -> println("value3 < 30")
  isEven(value) -> println("Even")
  value2 > 0 -> println("value2 > 0")
  else -> println("else")
}
```

### for文
「for(初期化 ; 条件 ; 増分処理)」という書き方はできない

```kotlin
val array: Array<Int> = arrayOf(1, 2, 3, 4, 5)
for (i in array) {
  print(i)
}
```

Rangeを使った書き方
```kotlin
for (i in 0..4) {
  print(i)
}
```

別の書き方
```kotlin
for (i in 0 until 10) {
  print(i)
}
```

要素だけでなくインデックスも取得する場合
```kotlin
val names = arrayOf("Doi", "Yamada", "Sakurai")
for ((index, elem) in names.withIndex()) {
  println("$index: $elem")
}
```

逆順でループするにはdownToという関数を使う
```kotlin
for (i in 4 downTo 0) {
  print(i)
}
```

### while文, do-while文
```kotlin
var i = 0
while (i < 10) {
  print(i)
  i++
}
```

```kotlin
var i = 0
do {
  print(i)
  i++
} while (i < 10)
```

## 文字列周りの便利機能
### 文字列テンプレート
基本的に`$変数名`で変数の値を埋め込めるが`${変数名}`みたいにすると連続した文字列の中でも値を出力できる

### 複数行文字列リテラル
`"""`で文字列リテラルを開始できる
```kotlin
var sql = """
SELECT *
FROM MyTable
WHERE cond > 1
"""
```

### trimMargin
文字列の各行にある最初の空白文字列を「|」まで削除する。
複数行文字列リテラルの各行の先頭の不要なスペースを削除するときに使うと便利
```kotlin
val sql2 = """
    |SELECT *
    |FROM MyTable
    |WHERE cond > 1
    """.trimMargin()
```

## Null安全
### 非Null型とNull許容型
通常の型はnullの代入を許容しない
```kotlin
var a : String = "abc"
a = null // => コンパイルエラー
```

nullを代入するには、型の後ろに?をつけて定義する
```kotlin
var a : String? = "abc"
b = null
```

### Nullチェックと安全な呼び出し
Null許容型のメソッドやプロパティを参照するとコンパイルエラーとなる

非Null型への参照
```kotlin
var a: String = "abc"
val l : Int = a.length // => OK
```

Null許容型への参照
```kotlin
var b : String? = "abc"
val l : Int = b.length // => コンパイルエラー
```

Null許容型のメソッドを呼び出すにはifで事前にnullではないことをチェックする
```kotlin
var b : String? = "abc"
val l : Int = if (b != null) b.length else -1
```

whenでもOK
```kotlin
when {
  b != null -> println(b.length)
}
```

`?.`演算子(safe call operator)を使えばNull許容型のメソッドやプロパティを参照することができる
```kotlin
val l : Int? = b?.length
```
bがnullの場合はlもnullになるからlの型はNull許容型になっている

### エルビス演算子
「第1項がnullではない場合には第1項を、nullの場合には第2項を返す」演算子
```kotlin
var b : String? = "abc"
val l : Int = if (b != null) b.length else -1
```

このようなifによるnullチェックは`?:`演算子を用いて記述できる
```kotlin
val l : Int = b?.length ?: -1
```

### !!演算子
`!!`演算子を用いれば、Null許容型をNull非許容型に無理やり変換できる
```kotlin
val l : Int = b!!.length
```
※基本的にこの演算子は使わない

## 関数
関数は`fun`を使って定義する
```kotlin
fun add(x: Int, y: Int): Int {
  return x + y
}
```

すべての引数は型を明記しないといけない。戻り値の型はブロックを書いた場合は定義する。ただし、戻り値の型がUnitの場合は省略できる。

関数が一つの式だけの場合は省略してかける
```kotlin
fun add(x: Int, y: Int): Int = x + y
```

型推論できるような戻り値の型であれば戻り値の型定義は省略できる
```kotlin
fun add(x: Int, y: Int) = x + y
```

関数の呼び出し
```kotlin
var result = add(1, 2)
```

引数のデフォルト値
```kotlin
fun toAddFormula(value: Int, num: Int = 1): String {
  return "$value + $num"
}
```

関数は型パラメータを扱うこともできる。関数の前に`<>`を使って宣言する
```kotlin
fun <T> singletonList(item: T): List<T> {
}
 ```

 ### 高階関数
 ### ラムダ式
 ### インライン関数
 ```kotlin
lock(1) { foo() }
```

`inline`をつけるとインライン関数になる

```kotlin
inline fun lock<T>(lock: Lock, body: () -> T): T {
}
```




## クラス
```kotlin
class MyClass {}

// メンバがない場合は波括弧を省略できる
class MyClass
```

インスタンスの生成
`new`キーワードは不要
```kotlin
val myClass = MyClass()
```

### プロパティ
```kotlin
class Counter() {
  var counter: Int = 0
  val maxValue = 10

  fun countUp() {
    counter += 1
  }

  fun print() {
    println($counter)
  }
}
```

### コンストラクタ
```kotlin
// プライマリコンストラクタ
class Person(name: String) {
  var firstName: String
  var lastName: String

  // プライマリコンストラクタの処理内容
  init {
    this.firstName = name
    this.lastnane = ""
  }

  // セカンダリコンストラクタ
  // this()でプライマリコンストラクタを呼び出す
  constructor(firstName: String, lastName: String): this(firstName) {
    this.lastName = lastName
  }

  fun print() {
    println("${firstName} ${lastName}")
  }
}
```

#### プライマリコンストラクタでのプロパティ定義とデフォルト値
```kotlin
class Person(val firstName: String, val lastName: String = "") {
  fun print() {
     println("${firstName} ${lastName}")
  }
}

val person3 = Person("doi")
```

### データクラス
オプションを指定する専用のクラスなど、データのみを保持するクラス

```kotlin
data class Person(val firstName: String, val lastName: String = "")

val person = Person("Taro", "Yamada")
```

### シングルトン
```kotlin
object SingletonSample {}

object Config {
  val map = mutableMapOf<String, String>
  fun read(key: String): String {
    return map[key] ?: ""
  }

  fun write(key: String, value: String) {
    map[key] = value
  }
}

val value = Config.read("hoge")
Config.write("hoge", "fuga")
```

### コンパニオンオブジェクト
`companion`キーワードを使って、staticメソッド、static変数の代替手段として用いることができる
コンパニオンオブジェクト内で定義されたメソッドやプロパティは、「クラス名.メソッド名」や「クラス名.プロパティ名」といった形式で呼び出すことができる

```kotlin
class CompanionSample(val firstName: String, val lastName: String = "") {
  companion object {
    fun hello(name: String) {
      println("$name")
    }

    val PI = 3.141592
  }
}

CompanionSample.hello("hoge") // => "hoge"

println(CompanionSample.PI)
```

### 継承
```kotlin
// 基底クラス。openをつけないと継承できない
open class Animal{}

// Animalを継承したCatクラス
class Cat: Animal() {}
```

#### 基底クラスのコンストラクタ呼び出し
```kotlin
open class Person(val firstName: String, val lastName: String = ""){}

class BussinessPerson(val firstName: String, val lastName: String = "", val age: Int): Person(firstName, lastName){}
```

セカンダリコンストラクタだけの場合は`super`キーワードを使って基底クラスのコンストラクタを呼び出す
```kotlin
class Derived: Base{
  constructor(a: Any) : super(a) {}

  constructor(a: Any, b: Any) : super(a, b) {}
}
```

#### メソッドのオーバーライド
```kotlin
open class Person(val firstName: String, val lastName: String = "") {
  open fun print() {
    println("${firstName} ${lastName}")
  }
}

class BussinessPerson(firstName: String, lastName: String = "", val age: Int): Person(firstName, lastName) {
  override fun print(){
    println("${firstName} ${lastName} ${age}")
  }
}
```

#### 抽象クラス
```kotlin
abstract class Vehicle{
  abstruct fun run()
}

class Car : Vehicle() {
  override fun run() {
    println("running")
  }
}

val vehicle = Vehicle() // => コンパイルエラー

val car = car()
car.run()

```


#### インタフェース
```kotlin
interface Flyable {
  fun fly()
}

class Airplane: Vehicle(), Flyable{
  override fun run() {}

  override fun fly() {}
}
```

実装を持つインタフェース
```kotlin
interface Stoppable {
  fun stop() {
    print("stopped")
  }
}

class StoppableVehicle: Vehicle(), Stoppable {
  override fun run() {}
}
```

プロパティを持つインタフェース
```kotlin
interface Limiter {
  val maxSpeed: Int

  fun boost(speed: Int) {
    if (speed > maxSpeed) {
      println("overspeed")
    } else {
      println("Boosted to $speed")
    }
  }
}

class CarWithLimiter: Vehicle(), Limiter {
  override maxSpeed: Int = 100
}
```
#### スマートキャスト
```kotlin
val cat = Cat() // Cat型（Animal型を継承）のインスタンス
val animal = cat as Animal // Animal型にキャスト
```

#### 型チェックとスマートキャスト
```kotlin
fun action(something: Any) {
  when(something) {
    is Point -> println("Point: {something.X}, {something.Y}")
    is Color -> println("Color: [{something.R},{something.G},{something.B}]")

  }
}
```
---

### 拡張関数
あるクラスを継承することなく、そのクラスにメソッドを追加する（ように見せる）機能
```kotlin
class Cat(val name: String) {
  private val age = 10
}

fun Cat.run() {
  println("${this.name} is Running!")
  //エラー。privateプロパティは参照できない
  //println("${this.name}'s age is ${this.age}")
}

val cat = Cat("Tama")
cat.run()
```

### Range
```kotlin
for (i in 1..10) {
  print(i) // 1,2,3,,,10
}

for(i in 2..10 step 2) {
  print(i) // 2,4,6,8,10
}

for(i in 9 downTo 1 step 2) {
  print(i) // 9,7,5,3,1
}

for(i in 1 until 10) {
  print(i) // 1,2,3,4,,,9 10は含まない
}
```

#### 文字範囲
```kotlin
// a-zの範囲
for(i in 'a'..'z') {
  print(i) // a,b,c,,,z
}

// A-zの範囲で2刻み
for(i in 'A' until 'z' step 2) {
  print(i) // A,C,E,,,,Y,[,],_,a,c,e,,y
}
```


### 分解宣言と多重戻り値
#### 多重戻り値とは
関数の戻り値を一つではなく、複数返せるようにする仕組みのこと

#### 分解宣言とは

```kotlin
//2つの数の和と積を返す関数。戻り値にPair<>を使うのがポイント
fun addAndMul(a: Int, b: Int): Pair<Int, Int> {
  return Pair(a + b, a * b)
}

val (wa, seki) = addAndMul(2, 5)
```

##### 分解宣言の仕組み
```kotlin
//実際には以下のような挙動（resultという変数は説明のためだけで、実際には使われない）
val result = addAndMul(2, 5)
//分解宣言は内部的にcomponentN関数を呼び出している
val wa = result.component1()
val seki = result.component2()
```

### 演算子オーバーロード
自分で定義したデータ型についても組み込みデータ型と同様に演算子を使えるようにする機能
