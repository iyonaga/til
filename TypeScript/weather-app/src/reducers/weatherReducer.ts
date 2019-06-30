import { ActionTypes } from "../constants";
import Weather from "../shared/models/Weather";
import { weatherSetAction, weatherErrorAction } from "../actions";

export type WeatherState = {
  loading: boolean;
  weather?: Weather;
}

const initialState = {
  loading: false
};

type Actions = (
  | ReturnType<typeof weatherSetAction>
  | ReturnType<typeof weatherErrorAction>
);

export const weatherReducer = (state: WeatherState = initialState, action: Actions): WeatherState => {
  switch (action.type) {
    case ActionTypes.WEATHER_SET:
      return {
        ...state,
        weather: action.payload.weather
      }

    case ActionTypes.WEATHER_ERROR:
      console.error(action.payload.error.message)
      return state;

    default:
      return state;
  }
}
