import { createStore } from 'redux';
import reducer from './modules/todoApp';

const configureStore = () => createStore(reducer);

export default configureStore;
