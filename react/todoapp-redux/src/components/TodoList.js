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
                <li key={i}><input type="checkbox" onChange={this.props.onTodoItemClick} value={i} checked={isCompleted} />
                  { isCompleted ? <s>{todo.title}</s> : todo.title }
                </li>
              )
            } else {
              return false;
            }
          })}
        </ol>
        <button value="all" onClick={this.props.onFilterClick}>All</button>
        <button value="active" onClick={this.props.onFilterClick}>Active</button>
        <button value="completed" onClick={this.props.onFilterClick}>Completed</button>
      </div>
    )
  }
}
