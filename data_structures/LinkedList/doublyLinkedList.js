const DoublyLinkedList = (function () {
  let prop = new WeakMap();

  const Node = function (data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  };

  const DoublyLinkedList = function () {
    // creating private length and head variables
    prop.set(this, { length: 0, head: null, tail: null });
  };

  // create new node at the end
  DoublyLinkedList.prototype.append = function (data) {
    // loading the current object's properties
    let property = prop.get(this);
    let { head, length, tail } = property;

    // creating the new node
    let node = new Node(data);

    // if list is empty
    if (head === null) {
      head = tail = node;
    } else {
      // add new node to tail->next
      tail.next = node;
      node.prev = tail;
      // appended node is the new tail
      tail = node;
    }

    // updating properties
    property.length = ++length;
    property.head = head;
    property.tail = tail;
  };

  DoublyLinkedList.prototype.insertFront = function (data) {
    // loading the current object's properties
    let property = prop.get(this);
    let { head, length, tail } = property;

    // creating the new node
    let node = new Node(data);

    // if list is empty
    if (head === null) {
      head = tail = node;
    } else {
      // add new node to head->prev
      node.next = head;
      head.prev = node;
      // new node is the new head
      head = node;
    }

    // updating properties
    property.length = ++length;
    property.head = head;
    property.tail = tail;
  };

  // insert to any position except for the last
  DoublyLinkedList.prototype.insert = function (position, data) {
    // loading the properties
    let property = prop.get(this);
    let { length, head } = property;

    // creating new node
    let node = new Node(data);

    // for first position
    if (position === 1) {
      this.insertFront(data);
      return;
    } else if (position > length) {
      return;
    } else {
      // find appropriate position and attach node
      let count = 1;
      let tempNode = head;

      while (count !== position) {
        tempNode = tempNode.next;
        count++;
      }

      // position the new node
      // adding the back link
      tempNode.prev.next = node;
      node.prev = tempNode.prev;
      // adding the front link
      tempNode.prev = node;
      node.next = tempNode;
    }

    // updating properties
    property.length = ++length;
    property.head = head;
  };

  DoublyLinkedList.prototype.indexOf = function (data) {
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

  DoublyLinkedList.prototype.removeFront = function () {
    // loading the properties
    let properties = prop.get(this);
    let { head, tail, length } = properties;

    if (head === null) {
      // if no item
      return;
    } else if (head === tail) {
      // if one item
      head = tail = null;
    } else {
      head = head.next;
      head.prev = null;
    }

    // updating the properties
    properties.length = --length;
    properties.head = head;
    properties.tail = tail;
  };

  DoublyLinkedList.prototype.removeEnd = function () {
    // loading the properties
    let properties = prop.get(this);
    let { head, tail, length } = properties;

    if (head === null) {
      // if no item
      return;
    } else if (head === tail) {
      // if one item
      head = tail = null;
    } else {
      tail = tail.prev;
      tail.next = null;
    }

    // updating the properties
    properties.length = --length;
    properties.head = head;
    properties.tail = tail;
  };

  // removes node at index
  DoublyLinkedList.prototype.removeAt = function (index) {
    // loading properties
    let property = prop.get(this);
    let { head, length } = property;

    // index out of range
    if (index > length) {
      return;
    }

    let tempNode = head;

    // first node
    if (index === 0) {
      this.removeFront();
      return;
    } else if (index === this.size() - 1) {
      // last node
      this.removeEnd();
      return;
    } else {
      // middle node
      let count = 0;
      while (count !== index) {
        tempNode = tempNode.next;
        count++;
      }

      // remove the node
      tempNode.prev.next = tempNode.next;
      tempNode.next.prev = tempNode.prev;
    }

    // updating properties
    [property.head, property.length] = [head, --length];
  };

  // remove item
  DoublyLinkedList.prototype.remove = function (data) {
    let index = this.indexOf(data);
    this.removeAt(index);
  };

  DoublyLinkedList.prototype.size = function () {
    return prop.get(this).length;
  };

  DoublyLinkedList.prototype.isEmpty = function () {
    return this.size() === 0;
  };

  DoublyLinkedList.prototype.toString = function () {
    // loading the properties
    let property = prop.get(this);
    let { head } = property;

    // array for string creation
    let displayArray = [];
    let tempNode = head;
    while (tempNode !== null) {
      displayArray.push(`<-${tempNode.data}->`);
      tempNode = tempNode.next;
    }

    // return the string
    return displayArray.join('');
  };

  DoublyLinkedList.prototype.toReverseString = function () {
    // loading the properties
    let property = prop.get(this);
    let { tail } = property;

    // array for string creation
    let displayArray = [];
    let tempNode = tail;
    while (tempNode !== null) {
      displayArray.push(`<-${tempNode.data}->`);
      tempNode = tempNode.prev;
    }

    // return the string
    return displayArray.join('');
  };

  return DoublyLinkedList;
})();

module.exports = DoublyLinkedList;
