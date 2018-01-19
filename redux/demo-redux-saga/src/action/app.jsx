import { createAction } from 'redux-actions';

// export default {
//   increment: () => {
//     return {
//       type: 'INCREMENT'
//     }
//   }
// }

// export const increment = () => {
//   return {
//     type: 'INCREMENT'
//   }
// }

export const INCREMENT = ('INCREMENT');
export const INCREMENT_ASYNC = ('INCREMENT_ASYNC');

export const increment = createAction(INCREMENT);
export const incrementAsync = createAction(INCREMENT_ASYNC);
