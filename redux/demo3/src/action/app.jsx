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
export const increment = createAction(INCREMENT)
