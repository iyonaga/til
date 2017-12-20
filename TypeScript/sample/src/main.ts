import { hello } from './sub';

const message: string = 'hello World';

hello(message);


function add(a: number, b: number): number {
  return a + b;
}

var num = add(1, 2);
console.log(num);
