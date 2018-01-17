const initialState = {
  fuga: 1
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      // return Object.assign({}, state, {
      //   fuga: state.fuga + 1
      // })
      return {
        fuga: state.fuga + 1
      }
    default:
      return state
  }
}
