let Stack = require('./stack.js');

const decimalToBase = (decimal, base) => {
  let stack = new Stack();
  let digits = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ];

  while (decimal > 0) {
    stack.push(digits[decimal % base]);
    decimal = Math.floor(decimal / base);
  }

  let reverseOfStack = [];
  while (!stack.isEmpty()) {
    reverseOfStack.push(stack.pop());
  }

  return reverseOfStack.join('');
};

exports.decimalToBase = decimalToBase;
