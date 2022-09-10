import { put, takeLatest } from 'redux-saga/effects';

import ACTION_TYPES from '../../core/config/actions';
import { ApiService } from '../../core/service/api.service';
import { ENDPOINT } from '../../core/config/endpoint';

import {
  getActivityFeedSuccess,
  getActivityFeedError,
  getActivityDetailSuccess,
  getActivityDetailError,
} from './activities.actions';

export function* getActivityFeed() {
  const http = new ApiService();
  try {
    const res = yield http.get([ENDPOINT.activities]);
    // handle successful response
    yield put(getActivityFeedSuccess(res));
  } catch (error) {
    // handle error response
    yield put(getActivityFeedError({ error }));
  }
}

export function* getActivityDetail({ payload }) {
  const http = new ApiService();
  try {
    const res = yield http.get([`${ENDPOINT.activities}/${payload}`]);
    // handle successful response
    yield put(getActivityDetailSuccess(res));
  } catch (error) {
    // handle error response
    yield put(getActivityDetailError({ error }));
  }
}

export function* watchActivity() {
  yield takeLatest(ACTION_TYPES.GET_ACTIVITY_FEED, getActivityFeed);
  yield takeLatest(ACTION_TYPES.GET_ACTIVITY_DETAIL, getActivityDetail);
}
