import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import TodoList from './TodoList';

export default class App extends Component {

  onInputKeyDown(e) {
    const enter = 13;
    if (e.keyCode === enter) {
      const title = e.target.value;
      this.props.addTodo(title);
      e.target.value = '';
    }
  }

  onTodoItemClick(e) {
    const idx = e.target.value;
    this.props.updateStatus(idx);
  }

  onFilterClick(e) {
    const value = e.target.value;
    this.props.updateFilterValue(value);
  }

  render() {
    return (
      <div>
        <Form onInputKeyDown={this.onInputKeyDown.bind(this)} />
        <TodoList
          todos={this.props.todos}
          filter={this.props.filter}
          onTodoItemClick={this.onTodoItemClick.bind(this)}
          onFilterClick={this.onFilterClick.bind(this)}
        />
      </div>
    );
  }
}
