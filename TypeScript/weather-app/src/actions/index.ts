import { Action } from 'redux';

import { ActionTypes } from "../constants";
import Weather from "../shared/models/Weather";

interface MapReadyAction extends Action {
  type: ActionTypes.MAP_READY;
}

interface WeatherGetAction extends Action {
  type: ActionTypes.WEATHER_GET;
  payload: {
    lat: number;
    lng: number;
  }
}

interface WeatherSetAction extends Action {
  type: ActionTypes.WEATHER_SET;
  payload: {
    weather: Weather;
  }
}

interface WeatherErrorAction extends Action {
  type: ActionTypes.WEATHER_ERROR;
  payload: {
    error: Error
  }
}

export const mapReadyAction = (): MapReadyAction => ({
  type: ActionTypes.MAP_READY
});

export const weatherGetAction = (lat: number, lng: number): WeatherGetAction => ({
  type: ActionTypes.WEATHER_GET,
  payload: {
    lat,
    lng
  }
});

export const weatherSetAction = (weather: Weather): WeatherSetAction => ({
  type: ActionTypes.WEATHER_SET,
  payload: {
    weather
  }
});

export const weatherErrorAction = (error: Error): WeatherErrorAction => ({
  type: ActionTypes.WEATHER_ERROR,
  payload: {
    error
  }
});
