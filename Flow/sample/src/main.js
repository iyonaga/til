/* @flow */

/*--------- Type annotating a function --------*/
function add(a: number, b: number): number {
  return a + b;
}

var num = add(1, 3);


/*--------- Type annotating an array --------*/
var foo: Array<number> = [1, 2, 3];


/*-------- Type annotating a Class ---------*/
class Bar {
  x: string;
  y: string | number;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

var bar1: Bar = new Bar('hello', 4);


/*--------- Type annonating an object ---------*/
var obj: {a: string, b: number, c: Array<string>, d: Bar} = {
  a: "hello",
  b: 42,
  c: ["hello", "world"],
  d: new Bar("Hello", 3)
};


var buz: ?string = null;
