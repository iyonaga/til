import { createAction, createActions, handleActions } from 'redux-actions';

const ADD_TODO      = 'ADD_TODO';
const UPDATE_FILTER = 'UPDATE_FILTER';
const UPDATE_STATUS = 'UPDATE_STATUS';

// export const addTodo = createAction(ADD_TODO, title => ({ title }));
// export const updateFilter = createAction(UPDATE_FILTER, filter => ({ filter }));
// export const updateStatus = createAction(UPDATE_STATUS, idx => ({ idx }));

export const {
  addTodo,
  updateFilter,
  updateStatus
} = createActions({
  ADD_TODO: title => ({ title}),
  UPDATE_FILTER: filter => ({ filter }),
  UPDATE_STATUS: idx => ({ idx })
});

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
};

const reducer = handleActions({
  ADD_TODO: (state, action) => {
    return Object.assign({}, state, {
      todos: [
        ...state.todos,
        {
          title: action.payload.title,
          status: 'active'
        }
      ]
    });
  },

  UPDATE_FILTER: (state, action) => {
    return Object.assign({}, state, {
      filter: action.payload.filter
    });
  },

  UPDATE_STATUS: (state, action) => {
    const status = state.todos[action.payload.idx].status === 'active' ? 'completed': 'active'

    return Object.assign({} , state, {
      todos: [
        ...state.todos.slice(0, action.payload.idx),
        Object.assign({}, state.todos[action.payload.idx], {
          status
        }),
        ...state.todos.slice(action.payload.idx + 1)
      ]
    });
  }
}, initialState);

export default reducer;
