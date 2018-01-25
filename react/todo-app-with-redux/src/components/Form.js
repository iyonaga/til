import React, { Component } from 'react';
import './Form.css';

export default class Form extends Component {
  render() {
    return (
      <div>
        <input type="text" className="input" onKeyDown={(e) => this.props.onInputKeyDown(e)} />
      </div>
    )
  }
}
