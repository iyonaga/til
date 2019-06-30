import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ofType, Epic } from "redux-observable";

import { ActionTypes } from '../constants'
import { weatherSetAction, weatherErrorAction } from '../actions';
import { getWather } from '../shared/services/api';


const weatherGetEpic: Epic = (action$) =>
  action$.pipe(
    ofType(ActionTypes.WEATHER_GET),
    switchMap(action => getWather(action.payload.lat, action.payload.lng)),
    map(weatherSetAction),
    catchError(error => of(weatherErrorAction(error)))
  )

export default [
  weatherGetEpic
]
