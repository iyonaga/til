import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import './index.css';
import App from './App';

/* action
------------------------*/
function addTodo(title) {
  return {
    type: 'ADD_TODO',
    title
  }
}

function updateFilter(filter) {
  return {
    type: 'UPDATE_FILTER',
    filter
  }
}

function updateStatus(idx) {
  return {
    type: 'UPDATE_STATUS',
    idx
  }
}

/* state
------------------------*/
const initialState = {
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

const store = createStore(reducer);


/* Reducer
------------------------*/
function reducer(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            title: action.title,
            status: 'active'
          }
        ]
      })

    case 'UPDATE_FILTER':
      return Object.assign({}, state, {
        filter: action.filter
      });

    case 'UPDATE_STATUS':
      const status = state.todos[action.idx].status === 'active' ? 'completed': 'active'

      return Object.assign({} , state, {
        todos: [
          ...state.todos.slice(0, action.idx),
          Object.assign({}, state.todos[action.idx], {
            status
          }),
          ...state.todos.slice(action.idx + 1)
        ]
      });

    default:
      return state
  }
}


/* View
------------------------*/
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo(title) {
      dispatch(addTodo(title));
    },

    updateFilterValue(value) {
      dispatch(updateFilter(value));
    },

    updateStatus(idx) {
      dispatch(updateStatus(idx));
    }
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
