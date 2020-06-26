const Map = (function () {
  const weakMap = new WeakMap();

  const Map = function () {
    weakMap.set(this, {});
  };

  Map.prototype.has = function (key) {
    const items = weakMap.get(this);
    return key in items;
  };

  Map.prototype.get = function (key) {
    const items = weakMap.get(this);
    return items[key];
  };

  Map.prototype.set = function (key, value) {
    const items = weakMap.get(this);
    items[key] = value;
  };

  Map.prototype.remove = function (key) {
    const items = weakMap.get(this);
    if (this.has(key)) {
      delete items[key];
      return true;
    }

    return false;
  };

  Map.prototype.clear = function () {
    weakMap.set(this, {});
  };

  Map.prototype.values = function () {
    let value = Object.values(weakMap.get(this));
    return value;
  };

  Map.prototype.keys = function () {
    let keys = Object.keys(weakMap.get(this));
    return keys;
  };

  Map.prototype.size = function () {
    return Object.entries(weakMap.get(this)).length;
  };

  Map.prototype.view = function () {
    let keyValuePair = Object.entries(weakMap.get(this));
    return keyValuePair;
  };

  return Map;
})();

module.exports = Map;
