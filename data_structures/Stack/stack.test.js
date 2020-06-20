let Stack = require('./stack');
let app = require('./numeric-conversions');

test('Decimal to Binary Conversion', () => {
  expect(app.decimalToBase(10, 2)).toBe('1010');
  expect(app.decimalToBase(100, 2)).toBe('1100100');
  expect(app.decimalToBase(23, 2)).toBe('10111');
});

test('Decimal to Octal Conversion', () => {
  expect(app.decimalToBase(127, 8)).toBe('177');
  expect(app.decimalToBase(52, 8)).toBe('64');
  expect(app.decimalToBase(100, 8)).toBe('144');
});

test('Decimal to Hexadecimal Conversion', () => {
  expect(app.decimalToBase(4253, 16)).toBe('109D');
  expect(app.decimalToBase(45, 16)).toBe('2D');
});

xtest('Empty stack', () => {
  let myStack = new Stack();

  expect(myStack.peek()).toBeUndefined();
  expect(myStack.isEmpty()).toBe(true);
  expect(myStack.size()).toBe(0);
  expect(myStack.testGet()).toEqual([]);
});

xtest('Non empty stack', () => {
  let myStack = new Stack();
  myStack.push(5);
  expect(myStack.testGet()).toEqual([5]);
  myStack.push(2);
  expect(myStack.testGet()).toEqual([5, 2]);
  expect(myStack.size()).toBe(2);
  expect(myStack.peek()).toBe(2);
  expect(myStack.isEmpty()).not.toBe(true);
});

xtest('Different stack should have separate arrays', () => {
  let stack1 = new Stack();
  stack1.push(2);
  expect(stack1.testGet()).toEqual([2]);

  let stack2 = new Stack();
  stack2.push(5);
  expect(stack2.testGet()).toEqual([5]);
});
