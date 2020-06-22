const LinkedList = (function () {
  let prop = new WeakMap();

  const Node = function (data) {
    this.data = data;
    this.next = null;
  };

  const LinkedList = function () {
    // creating private length and head variables
    prop.set(this, { length: 0, head: null });
  };

  // create new node at the end
  LinkedList.prototype.append = function (data) {
    // loading the current object's properties
    let property = prop.get(this);
    let { head, length } = property;

    // creating the new node
    let node = new Node(data);

    // if list is empty
    if (head === null) {
      head = node;
    } else {
      // traverse the linked list
      let tempNode = head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      // attach new node
      tempNode.next = node;
    }

    // updating properties
    property.length = ++length;
    property.head = head;
  };

  // insert to any position except for the last
  LinkedList.prototype.insert = function (position, data) {
    // loading the properties
    let property = prop.get(this);
    let { length, head } = property;

    // creating new node
    let node = new Node(data);

    // for first position
    if (position === 1) {
      node.next = head;
      head = node;
    } else if (position > length) {
      return;
    } else {
      // find appropriate position and attach node
      let count = 1;
      let tempNode = head;

      while (count !== position - 1) {
        tempNode = tempNode.next;
        count++;
      }

      node.next = tempNode.next;
      tempNode.next = node;
    }

    // updating properties
    property.length = ++length;
    property.head = head;
  };

  LinkedList.prototype.indexOf = function (data) {
    // loading the properties
    let property = prop.get(this);
    let { head } = property;

    let tempNode = head;
    let count = 0;
    while (tempNode !== null) {
      if (tempNode.data === data) {
        return count;
      }
      count++;
      tempNode = tempNode.next;
    }

    return -1;
  };

  // removes node at index
  LinkedList.prototype.removeAt = function (index) {
    // loading properties
    let property = prop.get(this);
    let { head, length } = property;

    // index out of range
    if (index > length) {
      return;
    }

    let tempNode = head;

    //first node
    if (index === 0) {
      head = head.next;
      // might need return
    } else {
      // middle or last node
      let count = 0;
      while (count !== index - 1) {
        tempNode = tempNode.next;
        count++;
      }
      tempNode.next = tempNode.next.next;
    }

    // updating properties
    [property.head, property.length] = [head, --length];
  };

  // remove item
  LinkedList.prototype.remove = function (data) {
    let index = this.indexOf(data);
    this.removeAt(index);
  };

  LinkedList.prototype.size = function () {
    return prop.get(this).length;
  };

  LinkedList.prototype.isEmpty = function () {
    // loading properties
    let property = prop.get(this);
    let { length } = property;

    return length === 0;
  };

  LinkedList.prototype.toString = function () {
    // loading the properties
    let property = prop.get(this);
    let { head } = property;

    // array for string creation
    let displayArray = [];
    let tempNode = head;
    while (tempNode !== null) {
      displayArray.push(`${tempNode.data}->`);
      tempNode = tempNode.next;
    }

    // return the string
    return displayArray.join('');
  };

  return LinkedList;
})();

module.exports = LinkedList;
