import { combineReducers } from 'redux';

import { mapReducer, MapState } from './mapReducer';
import { weatherReducer, WeatherState } from './weatherReducer';

export type RootState = {
  weather: WeatherState;
  map: MapState;
}

const rootReducers = combineReducers({
  weather: weatherReducer,
  map: mapReducer
});

export default rootReducers;
