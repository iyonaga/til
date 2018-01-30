import {
  createAction,
  //createActions,
  handleActions
} from 'redux-actions';

import { delay } from 'redux-saga';
import { takeEvery, takeLatest, call, put, select, all } from 'redux-saga/effects';

// User Action
const USER_ADD_TODO     = 'USER_ADD_TODO';
const USER_CLICK_FILTER = 'USER_CLICK_FILTER';
const USER_CLICK_TODO   = 'USER_CLICK_TODO';

// Reducer Action
const REDUCER_ADD_TODO           = 'REDUCER_ADD_TODO';
const REDUCER_CHANGE_TODO_FILTER = 'REDUCER_CHANGE_TODO_FILTER';
const REDUCER_CHANGE_TODO_STATUS = 'REDUCER_CHANGE_TODO_STATUS';

export const userAddTodo = createAction(USER_ADD_TODO, title => ({ title }));
export const userClickFilter = createAction(USER_CLICK_FILTER, filter => ({ filter }));
export const userClickTodo = createAction(USER_CLICK_TODO, idx => ({ idx }));
export const reducerAddTodo = createAction(REDUCER_ADD_TODO, title => ({ title }));
export const reducerChangeTodoFilter = createAction(REDUCER_CHANGE_TODO_FILTER, filter => ({ filter }));
export const reducerChangeTodoStatus = createAction(REDUCER_CHANGE_TODO_STATUS, idx => ({ idx }));

// export const {
//   userAddTodo,
//   userClickFilter,
//   userClickTodo,
//   reducerAddTodo,
//   reducerChangeTodoFilter,
//   reducerChangeTodoStatus,
// } = createActions({
//   USER_ADD_TODO: title => ({ title}),
//   USER_CLICK_FILTER: filter => ({ filter }),
//   USER_CLICK_TODO: idx => ({ idx }),
//   REDUCER_ADD_TODO: title => ({ title}),
//   REDUCER_CHANGE_TODO_FILTER: filter => ({ filter }),
//   REDUCER_CHANGE_TODO_STATUS: idx => ({ idx }),
// });

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
  REDUCER_ADD_TODO: (state, action) => {
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

  REDUCER_CHANGE_TODO_FILTER: (state, action) => {
    return Object.assign({}, state, {
      filter: action.payload.filter
    });
  },

  REDUCER_CHANGE_TODO_STATUS: (state, action) => {
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

function* todoSaga() {
  yield takeLatest(USER_CLICK_FILTER, function* (action) {
    yield delay(1000);
    yield put({type: REDUCER_CHANGE_TODO_FILTER, payload: action.payload})
    // yield put(reducerChangeTodoFilter(action.payload.filter));
  });

  yield takeEvery(USER_ADD_TODO, function* (action) {
    yield put({type: REDUCER_ADD_TODO, payload: action.payload});
  });

  yield takeEvery(USER_CLICK_TODO, function* (action) {
    yield put({type: REDUCER_CHANGE_TODO_STATUS, payload: action.payload});
  });
}

export function* rootSaga() {
  yield all([
    todoSaga(),
  ])
}
