const Hashtable = (function () {
  const property = new WeakMap();

  // size should be a power of 2 for uniform hashing(best results)
  const Hashtable = function (size) {
    let properties = {
      arraySize: size,
      numberOfElements: 0,
      array: [],
    };
    property.set(this, properties);
  };

  // private auxiliary functions
  const getProperty = function (reference) {
    return property.get(reference);
  };

  const hashFunction = function (key, arraySize, i) {
    let hash1 = key % arraySize;
    let hash2 = 1 + (key % (arraySize - 1));

    return (hash1 + i * hash2) % arraySize;
  };

  const calculateAlpha = function (numberOfElements, arraySize) {
    return Math.floor(numberOfElements / arraySize);
  };

  // Worst case: unsuccessful search O(1/(1-alpha))
  const search = function (key, data, objectReference) {
    let { arraySize, array, numberOfElements } = getProperty(objectReference);
    let maxSearchLimit = 1 / (1 - calculateAlpha(numberOfElements, arraySize));

    let i = 0;
    while (i <= maxSearchLimit) {
      let index = hashFunction(key, arraySize, i);
      // When searching indexes, undefined when looping through the array
      // means, that element didn't exist. If it did, the consecutive
      // array slots would be null or filled.
      if (array[index] === undefined) {
        break;
      } else if (array[index] !== null && array[index].data === data) {
        return index;
      }
      i++;
    }

    return -1;
  };

  Hashtable.prototype.has = function (key, data) {
    return search(key, data, this) !== -1;
  };

  Hashtable.prototype.insert = function (key, data) {
    let property = getProperty(this);
    let { arraySize, array, numberOfElements } = property;

    // if hashtable full or element exists
    if (numberOfElements === arraySize || search(key, data, this) !== -1) {
      return false;
    }

    let maxSearchLimit = 1 / (1 - calculateAlpha(numberOfElements, arraySize));

    let i = 0;
    while (i <= maxSearchLimit) {
      let index = hashFunction(key, arraySize, i);

      // if no element at that index
      if (array[index] === null || array[index] === undefined) {
        array[index] = { key: key, data: data };
        numberOfElements++;
        return true;
      }
      i++;
    }

    property.numberOfElements = numberOfElements;
  };

  Hashtable.prototype.delete = function (key, data) {
    let property = getProperty(this);
    let { array } = property;

    let index = search(key, data, this);
    if (index !== -1) {
      array[index] = null;
      property.numberOfElements--;
      return true;
    }

    return false;
  };

  return Hashtable;
})();

// let myHashTable = new Hashtable(16);

// myHashTable.insert(5, 10);
// myHashTable.insert(2, 6);

// console.log(myHashTable.has(5, 10));
// debugger;
// console.log(myHashTable.has(5, 9));

module.exports = Hashtable;
