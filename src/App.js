import React, { Component } from 'react';
import Cell from './Cell';
import Universe from './Universe';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      universe: new Universe(),
      rows: 22,
      cols: 33,
      iteration: 0
    }

    this.toggleCellState = this.toggleCellState.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
  }

  startGame() {
    if (!this.state.running) {
      this.setState({
        running: true,
      }, () => {
        this.cronJob = setInterval(() => {
          this.runGame();
        }, 100);
      })
    }
  }

  runGame() {
    this.setState({
      universe: this.state.universe.nextGeneration(),
      iteration: this.state.iteration + 1
    })
  }

  stopGame() {
    if (this.state.running) {
      this.setState({
        running: false,
      }, () => {
        clearInterval(this.cronJob);
      });
    }
  }

  resetGame() {
    if (!this.state.running) {
      this.setState({
        universe: new Universe(),
        iteration: 0,
      })
    }
  }

  renderBoard() {
    const newBoard = [];
    let nextRow = [];
    for (let row = 0; row < this.state.cols; row++) {
      for (let col = 0; col < this.state.rows; col++) {
        if (this.state.universe.isCellAlive({row, col})) {
          nextRow.push(<Cell toggleCellState={this.toggleCellState} key={[row,col]} alive={true} row={row} col={col} />)
        } else {
          nextRow.push(<Cell toggleCellState={this.toggleCellState} key={[row,col]} alive={false} row={row} col={col} />)
        }
      }
      newBoard.push(<div key={row}>{nextRow}</div>);
      nextRow = [];
    }
    return newBoard;
  }

  toggleCellState(cell) {
    if (!this.state.running) {
      this.setState({
        universe: this.state.universe.toggleCellState(cell),
      });
    }
  }

  render() {
    return (
      <div className="App">
      <div className="info-container">
        <div>Iteration: {this.state.iteration}</div>
        <div className="controls">
          <button onClick={this.startGame}>Start</button>
          <button onClick={this.stopGame}>Stop</button>
          <button onClick={this.resetGame}>Reset</button>
        </div>
      </div>

      <div className="board-container">
        {this.renderBoard()}
      </div>
      </div>
    );
  }
}



export default App;
