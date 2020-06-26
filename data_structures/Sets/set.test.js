const Set = require('./set');

describe('Check method', () => {
  let mySet = new Set();

  test('Returns true for existing elements', () => {
    mySet.add(5);
    expect(mySet.has(5)).toBe(true);
  });

  test('Returns false for non-existing elements', () => {
    expect(mySet.has(10)).toBe(false);
  });
});

describe('Add method', () => {
  let mySet = new Set();

  test('It adds all unique elements', () => {
    mySet.add(5);
    mySet.add(6);
    mySet.add(7);
    expect(mySet.has(5)).toBe(true);
    expect(mySet.has(6)).toBe(true);
    expect(mySet.has(7)).toBe(true);
  });

  test('It ignores duplicates', () => {
    expect(mySet.add(5)).toBe(false);
  });
});

describe('Remove method', () => {
  let mySet = new Set();

  test('Removes existing elements', () => {
    mySet.add(5);
    mySet.add(2);
    expect(mySet.delete(2)).toBe(true);
  });

  test('Ignores removing non-existing elements', () => {
    expect(mySet.delete(10)).toBe(false);
  });
});

describe('Clear method', () => {
  let mySet = new Set();

  test('Removes all elements', () => {
    mySet.add(5);
    mySet.add(2);
    mySet.clear();

    expect(mySet.has(5)).toBe(false);
  });
});

describe.only('Set operations', () => {
  test('union', () => {
    let mySetA = new Set();
    let mySetB = new Set();

    mySetA.add(5);
    mySetA.add(2);
    mySetA.add(3);

    mySetB.add(4);
    mySetB.add(6);
    mySetB.add(9);

    let unionSet = mySetA.union(mySetB);

    expect(unionSet.values()).toEqual(['2', '3', '4', '5', '6', '9']);
  });

  test('intersection', () => {
    let mySetA = new Set();
    let mySetB = new Set();

    mySetA.add(5);
    mySetA.add(2);
    mySetA.add(3);

    mySetB.add(4);
    mySetB.add(2);
    mySetB.add(9);

    let intersectionSet = mySetA.intersection(mySetB);

    expect(intersectionSet.values()).toEqual(['2']);
  });

  test('difference and subset', () => {
    let mySetA = new Set();
    let mySetB = new Set();

    mySetA.add(2);
    mySetA.add(3);

    mySetB.add(4);
    mySetB.add(2);
    mySetB.add(9);
    mySetB.add(3);

    let differenceSet = mySetB.difference(mySetA);

    expect(differenceSet.values()).toEqual(['4', '9']);
    expect(mySetA.isSubset(mySetB)).toBe(true);

    mySetA.add(5);
    expect(mySetA.isSubset(mySetB)).toBe(false);
  });
});
