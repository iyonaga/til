import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Map from '../components/Map';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getWeather: (lat: number, lng: number) => dispatch(actions.weatherGetAction(lat, lng)),
  mapReady: () => dispatch(actions.mapReadyAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
