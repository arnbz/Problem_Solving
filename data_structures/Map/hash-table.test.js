const Hashtable = require('./hash-table');

describe('Hashtable', () => {
  let myHashTable = new Hashtable(16);

  test('insert() and has()', () => {
    myHashTable.insert(5, 10);
    myHashTable.insert(2, 6);
    myHashTable.insert(1, 11);
    myHashTable.insert(9, 2);

    expect(myHashTable.has(5, 10)).toBe(true);
    expect(myHashTable.has(5, 9)).toBe(false);
  });

  test('delete()', () => {
    myHashTable.delete(5, 10);

    expect(myHashTable.has(5, 10)).toBe(false);
    expect(myHashTable.has(9, 2)).toBe(true);
  });
});
