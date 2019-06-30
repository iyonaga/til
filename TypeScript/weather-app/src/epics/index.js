import { combineEpics } from 'redux-observable';

import weatherEpic from './weatherEpic';

const epics = combineEpics(
  ...weatherEpic
);

export default epics;
