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
  render() {
    return (
      <div>
        <FormInput handleClick={this.props.handleClick} />
        <FormDisplay data={this.props.value}/>
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

function mapStateToProps(state) {
  return {
    value: state.value,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick(value) {
      dispatch(send(value));
    }
  };
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormApp);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
