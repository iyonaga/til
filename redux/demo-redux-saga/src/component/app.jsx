import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <span>{this.props.fuga}</span>
        <button onClick={this.props.handleClick}>+</button>
        <button onClick={this.props.handleIncrementAsync}>increment async</button>
      </div>
    )
  }
}
