let Stack = (function () {
  let items = new WeakMap();
  const Stack = function () {
    items.set(this, []);
  };

  Stack.prototype.push = function (element) {
    let stackArray = items.get(this);
    stackArray.push(element);
  };

  Stack.prototype.pop = function () {
    let stackArray = items.get(this);
    return stackArray.pop();
  };

  Stack.prototype.peek = function () {
    let stackArray = items.get(this);
    return stackArray[stackArray.length - 1];
  };

  Stack.prototype.isEmpty = function () {
    let stackArray = items.get(this);
    return stackArray.length === 0;
  };

  Stack.prototype.clear = function () {
    items.set(this, []);
  };

  Stack.prototype.size = function () {
    let stackArray = items.get(this);
    return stackArray.length;
  };

  Stack.prototype.print = function () {
    let stackArray = items.get(this);
    console.log(stackArray);
  };

  return Stack;
})();

module.exports = Stack;
