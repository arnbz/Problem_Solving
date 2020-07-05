let BST = require('./binary-search-tree');

describe.skip('BST methods', () => {
  let myBST = new BST();

  test('insert, in order traversal', () => {
    let array = [];

    // inserting
    myBST.insert(11);
    myBST.insert(7);
    myBST.insert(15);
    myBST.insert(5);
    myBST.insert(9);
    myBST.insert(13);
    myBST.insert(20);
    myBST.insert(3);
    myBST.insert(6);
    myBST.insert(8);
    myBST.insert(10);
    myBST.insert(12);
    myBST.insert(14);
    myBST.insert(18);
    myBST.insert(25);

    myBST.inOrderTraversal((key) => {
      array.push(key);
    });

    expect(array).toEqual([
      3,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      18,
      20,
      25,
    ]);
  });

  test('remove, search', () => {
    myBST.remove(6);
    myBST.remove(11);
    myBST.remove(15);

    let array = [];

    myBST.inOrderTraversal((key) => {
      array.push(key);
    });

    expect(array).toEqual([3, 5, 7, 8, 9, 10, 12, 13, 14, 18, 20, 25]);
    expect(myBST.search(12)).toBe(true);
    expect(myBST.search(0)).toBe(false);
  });
});
