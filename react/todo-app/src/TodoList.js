import React, { Component } from 'react';
 import TodoItem from './TodoItem';

export default class TodoList extends Component {
  render() {
    return (
      <div>
        <ol>
          {this.props.todos.map((todo, i) => {
            if (todo.status === this.props.filter || this.props.filter === 'all') {
              const isCompleted = (todo.status === 'completed');
              return (
                <TodoItem key={i} todo={todo} i={i} isCompleted={isCompleted} handleChange={this.props.updateStatus} />
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
