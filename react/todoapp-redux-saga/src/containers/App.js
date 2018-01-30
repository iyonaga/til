import { connect } from 'react-redux';
import App from '../components/App';
import {
  userAddTodo,
  userClickFilter,
  userClickTodo,
} from '../redux/modules/todoApp';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo(title) {
      dispatch(userAddTodo(title));
    },

    changeFilter(value) {
      dispatch(userClickFilter(value));
    },

    changeStatus(idx) {
      dispatch(userClickTodo(idx));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
