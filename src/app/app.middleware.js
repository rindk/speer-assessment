import { all } from 'redux-saga/effects';

import { watchActivity } from './pages/activities/activities.middlewares';

export default function* appMiddleware() {
  yield all([watchActivity()]);
}
