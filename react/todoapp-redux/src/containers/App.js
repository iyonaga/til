import { connect } from 'react-redux';
import App from '../components/App';
import {
  addTodo,
  updateFilter,
  updateStatus
} from '../redux/modules/todoApp';

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
