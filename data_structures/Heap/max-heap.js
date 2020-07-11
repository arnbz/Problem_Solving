const MaxHeap = (function () {
  const weakMap = new WeakMap();

  const MaxHeap = function () {
    weakMap.set(this, []);
  };

  // takes the index of the node and returns the parent index
  MaxHeap.prototype.parent = function (index) {
    // when parent node OR index >= number of elements in heap
    if (index <= 0 && index >= weakMap.get(this).length) {
      return -1;
    }

    return Math.floor((index - 1) / 2);
  };

  // takes node index, gives left child index
  MaxHeap.prototype.leftChild = function (index) {
    // when index >= number of elements in heap
    if (index >= weakMap.get(this).length) {
      return -1;
    }

    return Math.floor(2 * index + 1);
  };

  // takes node index, gives right child index
  MaxHeap.prototype.rightChild = function (index) {
    // when index >= number of elements in heap
    if (index >= weakMap.get(this).length) {
      return -1;
    }

    return Math.floor(2 * index + 2);
  };

  // returns value at root
  MaxHeap.prototype.getMaximum = function () {
    return weakMap.get(this)[0];
  };

  // swaps current node with children if current node smaller than children
  MaxHeap.prototype.percolateDown = function (index) {
    let heap = weakMap.get(this);

    let leftIndex = this.leftChild(index);
    let rightIndex = this.rightChild(index);

    // has no children
    if (leftIndex >= heap.length) {
      return;
    }

    // has both left and right children
    if (rightIndex < heap.length) {
      let maxIndex =
        heap[leftIndex] > heap[rightIndex] ? leftIndex : rightIndex;

      if (heap[index] < heap[maxIndex]) {
        [heap[maxIndex], heap[index]] = [heap[index], heap[maxIndex]];
        this.percolateDown(maxIndex);
      }
    } else if (heap[index] < heap[leftIndex]) {
      // if left children exists and current node < left node
      [heap[leftIndex], heap[index]] = [heap[index], heap[leftIndex]];
      this.percolateDown(leftIndex);
    }
  };

  // swaps current node with parent, if parent is smaller
  MaxHeap.prototype.percolateUp = function (index) {
    let heap = weakMap.get(this);

    // if current node is not root
    if (index <= 0) {
      return;
    }

    // find parent index
    let parentIndex = this.parent(index);

    // if current node > parent node
    if (heap[index] > heap[parentIndex]) {
      // swap current node and parent node
      [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
      // recursively percolate up on parent node
      this.percolateUp(parentIndex);
    }
  };

  // delete root
  MaxHeap.prototype.delete = function (data) {
    let heap = weakMap.get(this);

    // swap root element and last element
    [heap[0], heap[heap.length - 1]] = [heap[heap.length - 1], heap[0]];
    // delete last element
    heap.pop();
    // percolate down on root
    this.percolateDown(0);
  };

  MaxHeap.prototype.insert = function (data) {
    let heap = weakMap.get(this);

    // insert at last position in heap
    heap.push(data);
    // perform percolate up on inserted element to heapify
    this.percolateUp(heap.length - 1);
  };

  // replace the heap array with an empty array
  MaxHeap.prototype.destroy = function () {
    weakMap.set(this, []);
  };

  MaxHeap.prototype.printHeap = function () {
    let heap = weakMap.get(this);
    console.log(heap);
  };

  return MaxHeap;
})();
