const Queue = (function () {
  const items = new WeakMap();

  const Queue = function () {
    items.set(this, []);
  };

  Queue.prototype.enqueue = function (element) {
    let array = items.get(this);
    array.push(element);
  };

  Queue.prototype.dequeue = function () {
    let array = items.get(this);
    return array.shift();
  };

  Queue.prototype.front = function () {
    let array = items.get(this);
    return array[0];
  };

  Queue.prototype.isEmpty = function () {
    let array = items.get(this);
    return array.length === 0;
  };

  Queue.prototype.size = function () {
    let array = items.get(this);
    return array.length;
  };

  Queue.prototype.print = function () {
    let array = items.get(this);
    console.log(array);
  };

  Queue.prototype.testGetQueue = function () {
    let array = items.get(this);
    return array;
  };

  return Queue;
})();

module.exports = Queue;
