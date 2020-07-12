// minimum priority queue that stores {node, weight, parent} pairs
// used in Dijkstra's algorithm for graph
const MinPriorityQueue = (() => {
  const weakMap = new WeakMap();

  const MinPriorityQueue = function () {
    weakMap.set(this, []);
  };

  // takes the index of the node and returns the parent index
  MinPriorityQueue.prototype.parent = function (index) {
    // when parent node OR index >= number of elements in heap
    if (index <= 0 && index >= weakMap.get(this).length) {
      return -1;
    }

    return Math.floor((index - 1) / 2);
  };

  // takes node index, gives left child index
  MinPriorityQueue.prototype.leftChild = function (index) {
    // when index >= number of elements in heap
    if (index >= weakMap.get(this).length) {
      return -1;
    }

    return Math.floor(2 * index + 1);
  };

  // takes node index, gives right child index
  MinPriorityQueue.prototype.rightChild = function (index) {
    // when index >= number of elements in heap
    if (index >= weakMap.get(this).length) {
      return -1;
    }

    return Math.floor(2 * index + 2);
  };

  // returns value at root
  MinPriorityQueue.prototype.getMinimum = function () {
    return weakMap.get(this)[0];
  };

  // swaps current node with children if current node bigger than children
  MinPriorityQueue.prototype.percolateDown = function (index) {
    let heap = weakMap.get(this);

    let leftIndex = this.leftChild(index);
    let rightIndex = this.rightChild(index);

    // has no children
    if (leftIndex >= heap.length) {
      return;
    }

    // has both left and right children
    if (rightIndex < heap.length) {
      // get the min between child nodes
      let minIndex =
        heap[leftIndex].weight < heap[rightIndex].weight
          ? leftIndex
          : rightIndex;

      if (heap[index].weight > heap[minIndex].weight) {
        [heap[minIndex], heap[index]] = [heap[index], heap[minIndex]];
        this.percolateDown(minIndex);
      }
    } else if (heap[index].weight > heap[leftIndex].weight) {
      // if left children exists and current node > left node
      [heap[leftIndex], heap[index]] = [heap[index], heap[leftIndex]];
      this.percolateDown(leftIndex);
    }
  };

  // swaps current node with parent, if parent is bigger
  MinPriorityQueue.prototype.percolateUp = function (index) {
    let heap = weakMap.get(this);

    // if current node is root
    if (index <= 0) {
      return;
    }

    // find parent index
    let parentIndex = this.parent(index);

    // if current node < parent node
    if (heap[index].weight < heap[parentIndex].weight) {
      // swap current node and parent node
      [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
      // recursively percolate up on parent node
      this.percolateUp(parentIndex);
    }
  };

  // delete root
  MinPriorityQueue.prototype.delete = function () {
    let heap = weakMap.get(this);

    // swap root element and last element
    [heap[0], heap[heap.length - 1]] = [heap[heap.length - 1], heap[0]];
    // delete last element
    heap.pop();
    // if heap has element, percolate down on root
    if (heap.length > 0) this.percolateDown(0);
  };

  MinPriorityQueue.prototype.insert = function ({ name, weight, parent }) {
    let heap = weakMap.get(this);

    // insert at last position in heap
    heap.push({ name, weight, parent });
    // perform percolate up on inserted element to heapify
    this.percolateUp(heap.length - 1);
  };

  // replace the heap array with an empty array
  MinPriorityQueue.prototype.destroy = function () {
    weakMap.set(this, []);
  };

  MinPriorityQueue.prototype.size = function (parameters) {
    let heap = weakMap.get(this);
    return heap.length;
  };

  MinPriorityQueue.prototype.printHeap = function () {
    let heap = weakMap.get(this);
    console.log(heap);
  };

  return MinPriorityQueue;
})();
