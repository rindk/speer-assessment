import { createReducer } from '../../core/helper/reducer-factory';
import ACTION_TYPES from '../../core/config/actions';

const initialState = {
  isLoading: false,
  isProcessing: false,
  hasError: false,
  data: null,
  error: null,
};

// Get activity feed
const getActivityFeed = (state) => ({
  ...state,
  isLoading: true,
  isProcessing: true,
  success: null,
});

const getActivityFeedSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  isProcessing: false,
  data: payload,
  success: payload,
});

const getActivityFeedError = (state, payload) => ({
  ...state,
  isLoading: false,
  isProcessing: false,
  hasError: true,
  error: payload,
});

const getActivityFeedClear = (state) => ({
  ...state,
  hasError: false,
  isLoading: false,
  isProcessing: false,
  success: null,
  error: null,
});

// Get activity detail
const getActivityDetail = (state) => ({
  ...state,
  isLoading: true,
  isProcessing: true,
  success: null,
});

const getActivityDetailSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  isProcessing: false,
  data: payload,
  success: payload,
});

const getActivityDetailError = (state, payload) => ({
  ...state,
  isLoading: false,
  isProcessing: false,
  hasError: true,
  error: payload,
});

const getActivityDetailClear = (state) => ({
  ...state,
  hasError: false,
  isLoading: false,
  isProcessing: false,
  success: null,
  error: null,
});

const getActivityFeedStrategies = {
  [ACTION_TYPES.GET_ACTIVITY_FEED]: getActivityFeed,
  [ACTION_TYPES.GET_ACTIVITY_FEED_SUCCESS]: getActivityFeedSuccess,
  [ACTION_TYPES.GET_ACTIVITY_FEED_ERROR]: getActivityFeedError,
  [ACTION_TYPES.GET_ACTIVITY_FEED_CLEAR]: getActivityFeedClear,
  __default__: (state) => state,
};

const getActivityDetailStrategies = {
  [ACTION_TYPES.GET_ACTIVITY_DETAIL]: getActivityDetail,
  [ACTION_TYPES.GET_ACTIVITY_DETAIL_SUCCESS]: getActivityDetailSuccess,
  [ACTION_TYPES.GET_ACTIVITY_DETAIL_ERROR]: getActivityDetailError,
  [ACTION_TYPES.GET_ACTIVITY_DETAIL_CLEAR]: getActivityDetailClear,
  __default__: (state) => state,
};

export const activityFeed = createReducer(
  getActivityFeedStrategies,
  initialState
);

export const activityDetail = createReducer(
  getActivityDetailStrategies,
  initialState
);