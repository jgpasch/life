import React, { Component } from 'react';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alive: false,
    }
  }


  render() {
    return (
      <div
        className={"cell" + (this.props.alive ? ' dead' : '')}
        onClick={() => this.props.toggleCellState({row: this.props.row, col: this.props.col})}>
      </div>
    )
  }
}
