const weakMap = new WeakMap();

const Graph = function () {
  // vertices-> contains all vertices, adjList-> contains all adjacent vertices
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

// driver code
const print = (vertex) => {
  console.log(vertex);
};

let myGraph = new Graph();
myGraph.addVertex('A');
myGraph.addVertex('B');
myGraph.addVertex('C');
myGraph.addVertex('D');
myGraph.addVertex('E');

myGraph.addEdge('A', 'B');
myGraph.addEdge('A', 'C');
myGraph.addEdge('A', 'D');
myGraph.addEdge('C', 'D');
myGraph.addEdge('B', 'D');
myGraph.addEdge('B', 'E');
myGraph.addEdge('D', 'E');

myGraph.toString();

myGraph.BFS('E', print);
