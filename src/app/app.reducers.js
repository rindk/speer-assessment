import { combineReducers } from 'redux';

import apiController from './core/logger/api-controller.reducers';
import {
  activityFeed,
  activityDetail,
} from './pages/activities/activities.reducers';

export const appReducer = combineReducers({
  apiController,
  activityFeed,
  activityDetail,
});
