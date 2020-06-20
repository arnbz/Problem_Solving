let Queue = require('./queue');

xtest('Queue ADT functions as expected', () => {
  let queue = new Queue();
  expect(queue.isEmpty()).toBe(true);
  queue.enqueue(2);
  expect(queue.testGetQueue()).toEqual([2]);
  queue.enqueue(5);
  expect(queue.testGetQueue()).toEqual([2, 5]);
  expect(queue.front()).toBe(2);
  expect(queue.isEmpty()).toBe(false);
  expect(queue.size()).toBe(2);

  expect(queue.dequeue()).toBe(2);
  expect(queue.front()).toBe(5);
});
