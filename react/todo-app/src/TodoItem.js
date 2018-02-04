import React, { Component } from 'react';

export default class TodoItem extends Component {
  render() {
    const { todo, i, isCompleted, handleChange } = this.props;
    return (
      <li>
        <input type="checkbox" onChange={handleChange} value={i} checked={isCompleted} />
          { isCompleted ? <s>{todo.title}</s> : todo.title }
      </li>
    )
  }
}
