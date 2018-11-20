import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import TodoList from './TodoList';

export default class App extends Component {

  render() {
    return (
      <div>
        <Form add={this.add.bind(this)} />
        <TodoList
          todos={this.props.todos}
          filter={this.props.filter}
          updateStatus={this.updateStatus.bind(this)}
          updateFilterValue={this.updateFilterValue.bind(this)}
        />
      </div>
    );
  }

  add(e) {
    const enter = 13;
    if (e.keyCode === enter) {
      const title = e.target.value;
      this.props.addTodo(title);
      e.target.value = '';
    }
  }

  updateStatus(e) {
    const idx = e.target.value;
    this.props.updateStatus(idx);
  }

  updateFilterValue(e) {
    const value = e.target.value;
    this.props.updateFilterValue(value);
  }
}
