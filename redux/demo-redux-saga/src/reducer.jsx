import { handleActions } from 'redux-actions';

const initialState = {
  fuga: 0
};

// export default function reducer(state = initialState, action) {
//   switch(action.type) {
//     case 'INCREMENT':
//       // return Object.assign({}, state, {
//       //   fuga: state.fuga + 1
//       // })
//       return {
//         fuga: state.fuga + 1
//       }
//     default:
//       return state
//   }
// }

export default handleActions({
  INCREMENT: (state, action) => {
    return {
      fuga: state.fuga + 1
    }
  },
}, initialState);
