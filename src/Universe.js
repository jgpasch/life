export default class Universe {
  constructor(liveCells = new Map()) {
    this.state = {
      liveCells,
    }
  }

  getLiveCells() {
    return this.state.liveCells;
  }

  isCellAlive(cell) {
    return this.state.liveCells.has(`${cell.row}-${cell.col}`);
  }

  markAlive(cell) {
    this.state.liveCells.set(`${cell.row}-${cell.col}`, cell);
  }

  markDead(cell) {
    this.state.liveCells.delete(`${cell.row}-${cell.col}`);
  }

  toggleCellState(cell) {
    if (this.isCellAlive(cell)) {
      this.markDead(cell);
    } else {
      this.markAlive(cell);
    }
    return new Universe(this.state.liveCells);
  }

  nextGeneration() {
    this.nextGeneration = new Universe();
    const importantDeadCells = [];
    this.state.liveCells.forEach(cell => {
      this.checkLiveCells(cell, importantDeadCells);
    });

    importantDeadCells.forEach(cell => {
      this.checkDeadCells(cell);
    });

    return this.nextGeneration;
  }

  checkLiveCells(cell, deadCells) {
    let liveNeighbors = 0;

    for (let row = cell.row - 1; row <= cell.row + 1; row++) {
      for (let col = cell.col - 1; col <= cell.col + 1; col++) {
        if (row === cell.row && col === cell.col) {
          continue;
        }

        if (this.isCellAlive({row, col})) {
          liveNeighbors++;
        } else {
          deadCells.push({row, col});
        }
      }
    }

    if (liveNeighbors === 2 || liveNeighbors === 3) {
      this.nextGeneration.markAlive(cell);
    }
  }

  checkDeadCells(cell) {
    let liveNeighbors = 0;
    for (let row = cell.row - 1; row <= cell.row + 1; row++) {
      for (let col = cell.col - 1; col <= cell.col + 1; col++) {
        if (row === cell.row && col === cell.col) {
          continue;
        }

        if (this.isCellAlive({row, col})) {
          liveNeighbors++;
        }
      }
    }
    if (liveNeighbors === 3) {
      this.nextGeneration.markAlive(cell);
    }
  }

}
