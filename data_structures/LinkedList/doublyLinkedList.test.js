let DoublyLinkedList = require('./doublyLinkedList');

describe('append function', () => {
  let doublyLinkedList = new DoublyLinkedList();

  test('it should add to head if list is empty', () => {
    doublyLinkedList.append(5);
    expect(doublyLinkedList.toString()).toBe('<-5->');
  });

  test('it should add to tail if list is not empty', () => {
    doublyLinkedList.append(2);
    expect(doublyLinkedList.toString()).toBe('<-5-><-2->');

    doublyLinkedList.append(7);
    expect(doublyLinkedList.toString()).toBe('<-5-><-2-><-7->');
    // TODO: reverseTraversal
    // expect();
  });
});

describe('insertFront function', () => {
  let doublyLinkedList = new DoublyLinkedList();

  test('it should add to head if list is empty', () => {
    doublyLinkedList.insertFront(5);
    expect(doublyLinkedList.toString()).toBe('<-5->');
  });

  test('it should add to head if list is not empty', () => {
    doublyLinkedList.insertFront(2);
    expect(doublyLinkedList.toString()).toBe('<-2-><-5->');

    doublyLinkedList.insertFront(7);
    expect(doublyLinkedList.toString()).toBe('<-7-><-2-><-5->');

    // test reverseTraversal
    expect(doublyLinkedList.toReverseString()).toBe('<-5-><-2-><-7->');
  });
});

describe('insert function', () => {
  let doublyLinkedList = new DoublyLinkedList();

  test('it should add to head if position is 1', () => {
    doublyLinkedList.insert(1, 9);
    expect(doublyLinkedList.toString()).toBe('<-9->');

    doublyLinkedList.insert(1, 10);
    expect(doublyLinkedList.toString()).toBe('<-10-><-9->');
  });

  test('it should not not do anything if position > length', () => {
    doublyLinkedList.insert(5, 1);
    expect(doublyLinkedList.toString()).toBe('<-10-><-9->');
  });

  test('it should link new elements properly for middle elements', () => {
    doublyLinkedList.insert(2, 5);
    expect(doublyLinkedList.toString()).toBe('<-10-><-5-><-9->');

    doublyLinkedList.insert(2, 2);
    expect(doublyLinkedList.toString()).toBe('<-10-><-2-><-5-><-9->');
  });
});

describe('removeFront function', () => {
  let doublyLinkedList = new DoublyLinkedList();
  test('Should not do anything when list is empty', () => {
    doublyLinkedList.removeFront();
    expect(doublyLinkedList.isEmpty()).toBe(true);
  });

  test('Should set head and tail to null when there is one item', () => {
    doublyLinkedList.insertFront(2);
    doublyLinkedList.removeFront();
    expect(doublyLinkedList.toReverseString()).toBe('');
    expect(doublyLinkedList.toString()).toBe('');
  });

  test('Should remove head item from a list', () => {
    doublyLinkedList.insertFront(2);
    doublyLinkedList.insertFront(3);
    doublyLinkedList.insertFront(4);
    doublyLinkedList.removeFront();
    expect(doublyLinkedList.toString()).toBe('<-3-><-2->');
    expect(doublyLinkedList.toReverseString()).toBe('<-2-><-3->');
  });
});

describe('removeEnd function', () => {
  let doublyLinkedList = new DoublyLinkedList();
  test('Should not do anything when list is empty', () => {
    doublyLinkedList.removeEnd();
    expect(doublyLinkedList.isEmpty()).toBe(true);
  });

  test('Should set head and tail to null when there is one item', () => {
    doublyLinkedList.insertFront(2);
    doublyLinkedList.removeEnd();
    expect(doublyLinkedList.toReverseString()).toBe('');
    expect(doublyLinkedList.toString()).toBe('');
  });

  test('Should remove item from tail', () => {
    doublyLinkedList.insertFront(7);
    doublyLinkedList.insertFront(0);
    doublyLinkedList.append(10);
    doublyLinkedList.append(3);
    doublyLinkedList.removeEnd();
    expect(doublyLinkedList.toString()).toBe('<-0-><-7-><-10->');
    expect(doublyLinkedList.toReverseString()).toBe('<-10-><-7-><-0->');
  });
});

describe('removeAt function', () => {
  let dll = new DoublyLinkedList();

  test('remove front item', () => {
    // when empty
    dll.removeAt(1);

    // with items
    dll.insert(1, 5);
    dll.insert(1, 7);
    dll.insert(1, 10);
    dll.removeAt(0);
    expect(dll.toString()).toBe('<-7-><-5->');
  });

  test('remove end item', () => {
    dll.removeAt(1);
    expect(dll.toString()).toBe('<-7->');
  });

  test('remove middle item', () => {
    dll.append(5);
    dll.append(4);
    dll.append(7);
    dll.removeAt(2);
    expect(dll.toString()).toBe('<-7-><-5-><-7->');
  });
});
