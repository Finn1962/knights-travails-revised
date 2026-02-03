console.log("Resultat", knightMoves([0, 0], [7, 7]));

function knightMoves(startCoordinate, targetCoordinate) {
  if (!coordIsInRange(startCoordinate) || !coordIsInRange(targetCoordinate))
    return null;

  const graph = new Map([
    [
      coordToString(startCoordinate),
      { position: startCoordinate, parent: null },
    ],
  ]);
  const visitedCoords = [coordToString(startCoordinate)];
  const queue = [startCoordinate];

  while (queue.length > 0) {
    const currentCordinate = queue.shift();
    if (coordsAreEqual(currentCordinate, targetCoordinate)) {
      const path = traceGraph(graph, currentCordinate);
      return path;
    }
    const nextCoordinates = findNextCoords(currentCordinate);
    nextCoordinates.forEach((coordinate) => {
      if (!visitedCoords.includes(coordToString(coordinate))) {
        queue.push(coordinate);
        visitedCoords.push(coordToString(coordinate));
        graph.set(coordToString(coordinate), {
          position: coordinate,
          parent: currentCordinate,
        });
      }
    });
  }
}

function traceGraph(graph, currentCordinate) {
  let currentNode = graph.get(coordToString(currentCordinate));
  const path = [];
  while (currentNode.parent) {
    path.push(currentNode.position);
    currentNode = graph.get(coordToString(currentNode.parent));
  }
  path.push(currentNode.position);
  return path.reverse();
}

function coordsAreEqual(coord1, coord2) {
  return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}

function findNextCoords(coordinate) {
  const moveOffsets = [
    [+1, -2],
    [+2, -1],
    [+2, +1],
    [+1, +2],
    [-1, +2],
    [-2, +1],
    [-2, -1],
    [-1, -2],
  ];

  const nextCoordinates = [];
  moveOffsets.forEach((offsetCoordinate) => {
    const nextCoordinate = [
      coordinate[0] + offsetCoordinate[0],
      coordinate[1] + offsetCoordinate[1],
    ];
    if (coordIsInRange(nextCoordinate)) {
      nextCoordinates.push(nextCoordinate);
    }
  });
  return nextCoordinates;
}

function coordIsInRange(coordinate) {
  return (
    coordinate[0] >= 0 &&
    coordinate[0] <= 7 &&
    coordinate[1] >= 0 &&
    coordinate[1] <= 7
  );
}

function coordToString(coordinate) {
  return `${coordinate[0]},${coordinate[1]}`;
}
