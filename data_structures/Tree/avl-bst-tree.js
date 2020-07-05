const BST = (function () {
  const property = new WeakMap();

  const Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };

  const BST = function () {
    property.set(this, null);
  };

  const findMaxNode = function (root) {
    while (root.right) {
      root = root.right;
    }

    return root;
  };

  const removeHelper = function (key, currentNode) {
    // finding the node to delete
    if (key < currentNode.key) {
      // go to left node
      currentNode.left = removeHelper(key, currentNode.left);
    } else if (key > currentNode.key) {
      // go to right node
      currentNode.right = removeHelper(key, currentNode.right);
    } else {
      // when key === currentNode

      // when currentNode has no children
      if (!currentNode.left && !currentNode.right) {
        currentNode = null;
      } else if (!currentNode.left) {
        // when currentNode has only right child
        currentNode = currentNode.right;
      } else if (!currentNode.right) {
        // when currentNode has only left child
        currentNode = currentNode.left;
      } else {
        // when currentNode has left and right child

        // find maxNode from left subtree, swap max value with currentNode, remove the maxNode
        let maxNode = findMaxNode(currentNode.left);
        currentNode.key = maxNode.key;
        currentNode.left = removeHelper(maxNode.key, currentNode.left);
      }
    }
    return currentNode;
  };

  // returns true if found, otherwise returns false
  const searchHelper = function (key, currentNode) {
    if (currentNode === null) return false;
    if (key < currentNode.key) {
      return searchHelper(key, currentNode.left);
    } else if (key > currentNode.key) {
      return searchHelper(key, currentNode.right);
    } else {
      return true;
    }
  };

  const RRrotation = function (parameters) {};

  const insertHelper = function (newNode, currentNode) {
    // if current node is null
    if (!currentNode) {
      currentNode = newNode;
    } else if (newNode.key < currentNode.key) {
      currentNode.left = insertHelper(newNode, currentNode.left);
    } else if (newNode.key > currentNode.key) {
      currentNode.right = insertHelper(newNode, currentNode.right);
      // check balance
      // TODO: apply rotation
    } else {
      newNode.left = currentNode.left;
      currentNode.left = newNode;
    }

    return currentNode;
  };

  BST.prototype.insert = function (key) {
    // create new node
    let newNode = new Node(key);

    // fetching the root
    let root = property.get(this);

    root = insertHelper(newNode, root);

    property.set(this, root);
  };

  BST.prototype.search = function (key) {
    let root = property.get(this);
    return searchHelper(key, root);
  };

  const inOrderHelper = function (node, callback) {
    if (node === null) {
      return;
    }

    inOrderHelper(node.left, callback);
    callback(node.key);
    inOrderHelper(node.right, callback);
  };

  const preOrderHelper = function (node, callback) {
    if (node === null) {
      return;
    }

    callback(node.key);
    preOrderHelper(node.left, callback);
    preOrderHelper(node.right, callback);
  };

  const postOrderHelper = function (node, callback) {
    if (node === null) {
      return;
    }

    postOrderHelper(node.left, callback);
    postOrderHelper(node.right, callback);
    callback(node.key);
  };

  BST.prototype.inOrderTraversal = function (callback) {
    let root = property.get(this);
    inOrderHelper(root, callback);
  };

  BST.prototype.preOrderTraversal = function (callback) {
    let root = property.get(this);
    preOrderHelper(root, callback);
  };

  BST.prototype.postOrderTraversal = function (callback) {
    let root = property.get(this);
    postOrderHelper(root, callback);
  };

  BST.prototype.min = function () {
    let root = property.get(this);

    if (!root) {
      return null;
    }

    let tempNode = root;
    while (tempNode.left !== null) {
      tempNode = tempNode.left;
    }

    return tempNode.key;
  };

  BST.prototype.max = function () {
    let root = property.get(this);

    if (!root) {
      return null;
    }

    let tempNode = root;
    while (tempNode.right !== null) {
      tempNode = tempNode.right;
    }

    return tempNode.key;
  };

  BST.prototype.remove = function (key) {
    // fetching the root
    let root = property.get(this);
    root = removeHelper(key, root);
    property.set(this, root);
  };

  return BST;
})();

module.exports = BST;
