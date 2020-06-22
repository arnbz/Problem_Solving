let LinkedList = require('./linkedlist');

test('Remove from middle or end by data', () => {
  let list = new LinkedList();

  expect(list.isEmpty()).toBe(true);

  list.append(1);
  list.append(2);
  list.append(3);
  list.append(4);

  expect(list.isEmpty()).toBe(false);

  list.remove(3);
  expect(list.toString()).toBe('1->2->4->');

  list.remove(1);
  expect(list.toString()).toBe('2->4->');
});

test('Add to the end of list', () => {
  let list = new LinkedList();
  list.append(5);
  expect(list.toString()).toBe('5->');
  list.append(7);
  expect(list.toString()).toBe('5->7->');
  expect(list.size()).toBe(2);
});

test('Add to any position', () => {
  let list = new LinkedList();
  list.insert(2, 5);
  expect(list.toString()).toBe('');
  list.insert(1, 5);
  expect(list.toString()).toBe('5->');
  list.insert(1, 2);
  expect(list.toString()).toBe('2->5->');
  list.insert(2, 6);
  expect(list.toString()).toBe('2->6->5->');
  expect(list.size()).toBe(3);
  list.insert(3, 10);
  expect(list.toString()).toBe('2->6->10->5->');
  expect(list.indexOf(2)).toBe(0);
});

test('Remove from middle or end by index', () => {
  let list = new LinkedList();
  list.append(1);
  list.append(2);
  list.append(3);
  list.append(4);

  list.removeAt(3);
  expect(list.toString()).toBe('1->2->3->');
});

test('Remove from first by index', () => {
  let list = new LinkedList();
  list.append(1);
  list.append(2);
  list.append(3);
  list.append(4);

  list.removeAt(0);
  expect(list.toString()).toBe('2->3->4->');
  list.removeAt(0);
  expect(list.toString()).toBe('3->4->');
});
