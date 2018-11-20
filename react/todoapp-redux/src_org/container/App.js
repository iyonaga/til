import React from 'react';
import { connect } from 'redux-react';
import App from '../modules/App';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
