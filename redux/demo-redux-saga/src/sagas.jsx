import { takeEvery, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { INCREMENT_ASYNC, increment } from './action/app';

export function* incrementAsync() {
  //yield call(delay, 1000);
  yield delay(1000);
  yield put(increment());
}

export default function* mySaga() {
  yield* takeEvery(INCREMENT_ASYNC, incrementAsync);
}
