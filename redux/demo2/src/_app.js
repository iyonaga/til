import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

/* Action
--------------------*/
// action名
const SEND = 'SEND';

// action creators
function send(value) {
  return {
    type: SEND,
    value,
  };
}


/* Store
--------------------*/
const initialState = {
  value: null,
};

const store = createStore(formReducer, initialState);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(send('aaa'));


/* Reducer
--------------------*/
function formReducer(state, action) {
  console.log(action);
  switch (action.type) {
    case 'SEND':
      return Object.assign({}, state, {
        value: action.value
      });
    default:
      return state;
  }
}


/* View
--------------------*/
class FormApp extends Component {
  constructor() {
    super();
    this.state = {
      data: ""
    };
  }

  handleClick(value) {
    this.setState({
      data: value
    });
  }

  render() {
    return (
      <div>
        <FormInput handleClick={this.handleClick.bind(this)} />
        <FormDisplay data={this.state.data}/>
      </div>
    )
  }
}

class FormInput extends Component {
  send(e) {
    e.preventDefault();
    this.props.handleClick(this.refs.myInput.value);
    this.refs.myInput.value = '';
  }

  render() {
    return (
      <form>
        <input type="text" ref="myInput" />
        <button onClick={this.send.bind(this)}>Send</button>
      </form>
    )
  }
}

class FormDisplay extends Component {
  render() {
    return (
      <div>{this.props.data}</div>
    )
  }
}

ReactDOM.render(
  <FormApp/>,
  document.getElementById('root')
)
