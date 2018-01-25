export function addTodo(title) {
  return {
    type: 'ADD_TODO',
    title
  }
}

export function updateFilter(filter) {
  return {
    type: 'UPDATE_FILTER',
    filter
  }
}

export function updateStatus(idx) {
  return {
    type: 'UPDATE_STATUS',
    idx
  }
}

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

export default function reducer(state = initialState, action) {
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
