import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import TodoList from './TodoList';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      todos: [
        {
          title: 'dummy',
          status: 'active'
        },
        {
          title: 'completed todo',
          status: 'completed'
        }
      ],
      filter: 'all'
    }
  }

  render() {
    return (
      <div>
        <Form add={this.add.bind(this)} />
        <TodoList
          todos={this.state.todos}
          filter={this.state.filter}
          updateStatus={this.updateStatus.bind(this)}
          updateFilterValue={this.updateFilterValue.bind(this)}
        />
      </div>
    );
  }

  add(e) {
    const enter = 13;
    if (e.keyCode === enter) {
      this.setState({
        todos: this.state.todos.concat({title: e.target.value, status: 'active'})
      });
      e.target.value = '';
    }
  }

  updateStatus(e) {
    const i = e.target.value;
    let _todos = this.state.todos;
    _todos[i].status = _todos[i].status === 'active' ? 'completed': 'active';
    this.setState({
      todos: _todos
    })
  }

  updateFilterValue(e) {
    this.setState({
      filter: e.target.value
    })
  }
}
