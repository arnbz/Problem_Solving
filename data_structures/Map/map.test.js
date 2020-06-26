const Map = require('./map');

describe('Testing Map ADT', () => {
  let map = new Map();
  test('Setting items', () => {
    map.set(2, 5);
    map.set(1, 7);
    map.set(3, 10);
    map.set(4, 2);
    expect(map.get(1)).toBe(7);
    expect(map.view()).toEqual([
      ['1', 7],
      ['2', 5],
      ['3', 10],
      ['4', 2],
    ]);
  });

  test('Deleting items', () => {
    map.remove(2);
    expect(map.has(2)).toBe(false);
    expect(map.has(1)).toBe(true);
    map.remove(3);
    expect(map.has(4)).toBe(true);
    expect(map.size()).toBe(2);
  });

  test('Getting the keys and values', () => {
    expect(map.keys()).toEqual(['1', '4']);

    expect(map.values()).toEqual([7, 2]);
  });

  test('Clearing the map', () => {
    map.clear();
    expect(map.size()).toBe(0);
    expect(map.keys()).toEqual([]);
  });
});
