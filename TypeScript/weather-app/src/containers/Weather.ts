import { connect } from 'react-redux';

import Weather from '../components/Weather';
import { RootState } from '../reducers';

const mapStateToProps = (state: RootState) => ({
  weather: state.weather.weather
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
