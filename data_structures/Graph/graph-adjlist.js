const Graph = (function () {
  const weakMap = new WeakMap();

  const Graph = function () {
    // vertices-> contains all vertices, adjList-> contains array of all adjacent vertices
    let property = {
      vertices: [],
      adjList: new Map(),
    };

    weakMap.set(this, property);
  };

  Graph.prototype.addVertex = function (v) {
    let { vertices, adjList } = weakMap.get(this);

    vertices.push(v);
    adjList.set(v, []);
  };

  Graph.prototype.addEdge = function (v, w) {
    let { adjList } = weakMap.get(this);
    adjList.get(v).push(w);
    adjList.get(w).push(v);
  };

  Graph.prototype.addDirectedEdge = function (v, w) {
    let { adjList } = weakMap.get(this);
    adjList.get(v).push(w);
  };

  Graph.prototype.addWeightedEdge = function (v, w, weight) {
    let { adjList } = weakMap.get(this);

    adjList.get(w).push({ vertex: v, weight });
    adjList.get(v).push({ vertex: w, weight });
  };

  Graph.prototype.toString = function () {
    let { vertices, adjList } = weakMap.get(this);

    // for each vertex
    vertices.forEach((vertex) => {
      let string = '' + vertex + ' -> ';

      // for each adjacent vertex
      let adjVertices = adjList.get(vertex);
      adjVertices.forEach((adjVertex) => {
        string += adjVertex + ' ';
      });

      console.log(string);
    });
  };

  Graph.prototype.BFS = function (startingVertex, callback) {
    let { adjList } = weakMap.get(this);

    // to track if vertex has already been in queue or not
    let visited = new Set();

    let queue = [];
    queue.push(startingVertex);
    visited.add(startingVertex);

    while (queue.length > 0) {
      let vertex = queue.shift();
      let adjacentVertices = adjList.get(vertex);

      adjacentVertices.forEach((adjVertex) => {
        if (!visited.has(adjVertex)) {
          visited.add(adjVertex);
          queue.push(adjVertex);
        }
      });

      if (callback) {
        callback(vertex);
      }
    }
  };

  // returns parent vertices and shortest path
  Graph.prototype.shortestPathBFS = function (startingVertex) {
    let { adjList } = weakMap.get(this);

    // contains distance of node from startingVertex
    let distance = {};
    // contains parent node
    let parent = {};

    // contains nodes that has been visited
    let visited = new Set();

    let queue = [];
    queue.push(startingVertex);
    // starting vertex has no parent
    parent[startingVertex] = null;
    // starting vertex has been visited
    visited.add(startingVertex);
    distance[startingVertex] = 0;

    while (queue.length > 0) {
      let vertex = queue.shift();
      let adjVertices = adjList.get(vertex);

      adjVertices.forEach((adjVertex) => {
        if (!visited.has(adjVertex)) {
          queue.push(adjVertex);
          visited.add(adjVertex);
          parent[adjVertex] = vertex;
          distance[adjVertex] = distance[vertex] + 1;
        }
      });
    }

    return {
      distance: distance,
      parent: parent,
    };
  };

  Graph.prototype.DFS = function (callback) {
    let { vertices, adjList } = weakMap.get(this);

    let visited = new Set();
    let stack = [];

    vertices.forEach((vertex) => {
      if (visited.has(vertex)) {
        // equivalent of continue
        return;
      }

      visited.add(vertex);
      stack.push(vertex);
      while (stack.length > 0) {
        let stackTopVertex = stack.pop();
        let adjVertices = adjList.get(stackTopVertex);
        adjVertices.forEach((adjVertex) => {
          if (!visited.has(adjVertex)) {
            stack.push(adjVertex);
            visited.add(adjVertex);
          }
        });

        callback(stackTopVertex);
      }
    });
  };

  const improvedDFSHelper = function (
    vertex,
    visited,
    visitTime,
    finishTime,
    adjList,
    timeOb
  ) {
    visited.add(vertex);
    visitTime[vertex] = timeOb.time++;

    let adjVertices = adjList.get(vertex);
    adjVertices.forEach((adjVertex) => {
      if (visited.has(adjVertex)) return;
      improvedDFSHelper(
        adjVertex,
        visited,
        visitTime,
        finishTime,
        adjList,
        timeOb
      );
    });

    finishTime[vertex] = timeOb.time++;
  };

  // returns visiting and finishing times
  Graph.prototype.improvedDFS = function () {
    let { vertices, adjList } = weakMap.get(this);

    let visited = new Set();

    let visitTime = {};
    let finishTime = {};

    vertices.forEach((vertex) => {
      if (visited.has(vertex)) {
        // equivalent of continue
        return;
      }

      improvedDFSHelper(vertex, visited, visitTime, finishTime, adjList, {
        time: 1,
      });
    });

    return {
      visitTime,
      finishTime,
    };
  };

  const order = function (a, b) {
    if (a[1] < b[1]) {
      return 1;
    } else if (a[1] > b[1]) {
      return -1;
    } else return 0;
  };

  // only for Directed Acyclic Graphs
  Graph.prototype.topologicalSort = function () {
    let { finishTime } = this.improvedDFS();

    let timeArray = Object.entries(finishTime);
    timeArray.sort(order);
    for (let item of timeArray) {
      console.log(item[0]);
    }
  };

  // shortest path using greedy algorithm
  // works for weighted and non-weighted graphs ?
  Graph.prototype.Dijkstra = function (startingNode) {
    let { adjList } = weakMap.get(this);

    let visited = new Set();
    let parent = {};
    let distance = {};

    // keeps {vertex, weight, parent} information
    let minHeap = new MinPriorityQueue();

    // push starting node with name, parent and weight to min-heap
    minHeap.insert({ name: startingNode, weight: 0, parent: null });

    // until min-heap is empty
    while (minHeap.size() > 0) {
      // select the node with shortest distance
      let {
        name: currentNode,
        weight,
        parent: nodeParent,
      } = minHeap.getMinimum();

      minHeap.delete();

      // if node is unvisited
      if (!visited.has(currentNode)) {
        // mark as visited
        visited.add(currentNode);
        // set parent
        parent[currentNode] = nodeParent;
        // set distance = parent distance + current node weight
        distance[currentNode] = nodeParent ? weight : 0;

        // push all unvisited adjacent nodes in heap with parent information
        let adjacentNodes = adjList.get(currentNode);
        adjacentNodes.forEach((adjacentNode) => {
          if (visited.has(adjacentNode.vertex)) {
            return;
          }

          minHeap.insert({
            name: adjacentNode.vertex,
            weight: adjacentNode.weight + distance[currentNode],
            parent: currentNode,
          });
        });
      }
    }

    return { parent, distance };
  };

  return Graph;
})();
