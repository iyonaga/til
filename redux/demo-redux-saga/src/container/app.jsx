import React from 'react';
import { connect } from 'react-redux';

import App from '../component/app';
import { increment, incrementAsync } from '../action/app';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () => {
      dispatch(increment())
    },
    handleIncrementAsync: () => {
      dispatch(incrementAsync());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
