const Set = (function () {
  let prop = new WeakMap();

  const getObject = function (reference) {
    return prop.get(reference);
  };

  const Set = function () {
    prop.set(this, {});
  };

  Set.prototype.has = function (value) {
    let setObject = getObject(this);
    return value in setObject;
  };

  Set.prototype.add = function (value) {
    let setObject = getObject(this);

    // if value doesn't exist, add to set and return true
    if (!this.has(value)) {
      setObject[value] = value;
      return true;
    }
    // else, return false
    return false;
  };

  Set.prototype.delete = function (value) {
    let setObject = getObject(this);
    // if value exists, delete it and return true
    if (this.has(value)) {
      delete setObject[value];
      return true;
    }
    // else, return false
    return false;
  };

  Set.prototype.clear = function () {
    prop.set(this, {});
  };

  Set.prototype.size = function () {
    let setObject = getObject(this);
    return Object.keys(setObject).length;
  };

  Set.prototype.values = function () {
    let setObject = getObject(this);
    return Object.keys(setObject);
  };

  Set.prototype.union = function (setB) {
    let unionSet = new Set();

    // get values of sets
    let setAValues = this.values();
    let setBValues = setB.values();

    // add all the values to union set and return
    for (let value of setAValues) {
      unionSet.add(value);
    }
    for (let value of setBValues) {
      unionSet.add(value);
    }

    return unionSet;
  };

  Set.prototype.intersection = function (setB) {
    let intersectionSet = new Set();

    let setAValues = this.values();
    setAValues.forEach((value) => {
      if (setB.has(value)) {
        intersectionSet.add(value);
      }
    });

    return intersectionSet;
  };

  Set.prototype.difference = function (setB) {
    let differenceSet = new Set();

    let setAValues = this.values();
    setAValues.forEach((value) => {
      if (!setB.has(value)) {
        differenceSet.add(value);
      }
    });

    return differenceSet;
  };

  Set.prototype.isSubset = function (setB) {
    if (this.size() > setB.size()) {
      return false;
    }

    let setAValues = this.values();
    for (let value of setAValues) {
      if (!setB.has(value)) {
        return false;
      }
    }

    return true;
  };

  return Set;
})();

module.exports = Set;
