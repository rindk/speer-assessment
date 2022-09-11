import { put, takeLatest } from 'redux-saga/effects';

import ACTION_TYPES from '../../core/config/actions';
import { ApiService } from '../../core/service/api.service';
import { ENDPOINT } from '../../core/config/endpoint';

import {
  getActivityFeed as getActivityFeedAction,
  getActivityFeedSuccess,
  getActivityFeedError,
  getActivityFeedClear,
  getActivityDetailSuccess,
  getActivityDetailError,
  archiveActivitySuccess,
  archiveActivityError,
  resetActivitySuccess,
  resetActivityError,
} from './activities.actions';

export function* getActivityFeed() {
  const http = new ApiService();
  try {
    const res = yield http.get([ENDPOINT.activities]);

    let groups;
    if (res?.length) {
      groups = res.reduce((result, item) => {
        const date = new Date(item.created_at).toLocaleDateString();
        result[date] = [...(result[date] ?? []), item];
        return result;
      }, {});
    }
    const result = Object.keys(groups).map((date) => ({
      date,
      data: groups[date],
    }));

    // handle successful response
    yield put(getActivityFeedSuccess(result ?? res));
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

export function* archiveActivity({ payload }) {
  const http = new ApiService();
  try {
    const res = yield http.post([`${ENDPOINT.activities}/${payload.id}`], {
      is_archived: payload.isArchive,
    });
    // handle successful response
    yield put(archiveActivitySuccess(res?.is_archived));
    yield put(getActivityDetailSuccess(res));
    yield put(payload.needReload ? getActivityFeedAction() : getActivityFeedClear());
  } catch (error) {
    // handle error response
    yield put(archiveActivityError());
  }
}

export function* resetActivity() {
  const http = new ApiService();
  try {
    const res = yield http.get([ENDPOINT.reset]);
    // handle successful response
    yield put(resetActivitySuccess());
    yield put(getActivityFeedAction());
  } catch (error) {
    // handle error response
    yield put(resetActivityError());
  }
}

export function* watchActivity() {
  yield takeLatest(ACTION_TYPES.GET_ACTIVITY_FEED, getActivityFeed);
  yield takeLatest(ACTION_TYPES.GET_ACTIVITY_DETAIL, getActivityDetail);
  yield takeLatest(ACTION_TYPES.ARCHIVE_ACTIVITY, archiveActivity);
  yield takeLatest(ACTION_TYPES.RESET_ACTIVITY, resetActivity);
}
