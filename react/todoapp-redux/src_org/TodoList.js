import React, { Component } from 'react';

export default class TodoList extends Component {
  render() {
    return (
      <div>
        <ol>
          {this.props.todos.map((todo, i) => {
            if (todo.status === this.props.filter || this.props.filter === 'all') {
              const isCompleted = (todo.status === 'completed');
              return (
                <li key={i}><input type="checkbox" onChange={this.props.updateStatus} value={i} checked={isCompleted} />
                  { isCompleted ? <s>{todo.title}</s> : todo.title }
                </li>
              )
            } else {
              return false;
            }
          })}
        </ol>
        <button value="all" onClick={this.props.updateFilterValue}>All</button>
        <button value="active" onClick={this.props.updateFilterValue}>Active</button>
        <button value="completed" onClick={this.props.updateFilterValue}>Completed</button>
      </div>
    )
  }
}
