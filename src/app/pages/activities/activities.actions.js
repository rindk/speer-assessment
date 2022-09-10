import ACTION_TYPES from '../../core/config/actions';

// Get activity feed
export const getActivityFeed = () => ({
  type: ACTION_TYPES.GET_ACTIVITY_FEED,
});

export const getActivityFeedSuccess = (payload) => ({
  type: ACTION_TYPES.GET_ACTIVITY_FEED_SUCCESS,
  payload,
});

export const getActivityFeedError = (payload) => ({
  type: ACTION_TYPES.GET_ACTIVITY_FEED_ERROR,
  payload,
});

export const getActivityFeedClear = () => ({
  type: ACTION_TYPES.GET_ACTIVITY_FEED_CLEAR,
});

// Get activity detail
export const getActivityDetail = (payload) => ({
  type: ACTION_TYPES.GET_ACTIVITY_DETAIL,
  payload,
});

export const getActivityDetailSuccess = (payload) => ({
  type: ACTION_TYPES.GET_ACTIVITY_DETAIL_SUCCESS,
  payload,
});

export const getActivityDetailError = (payload) => ({
  type: ACTION_TYPES.GET_ACTIVITY_DETAIL_ERROR,
  payload,
});

export const getActivityDetailClear = () => ({
  type: ACTION_TYPES.GET_ACTIVITY_DETAIL_CLEAR,
});

// Archive activity
export const archiveActivity = (payload) => ({
  type: ACTION_TYPES.ARCHIVE_ACTIVITY,
  payload,
});

export const archiveActivitySuccess = (payload) => ({
  type: ACTION_TYPES.ARCHIVE_ACTIVITY_SUCCESS,
  payload,
});

export const archiveActivityError = (payload) => ({
  type: ACTION_TYPES.ARCHIVE_ACTIVITY_ERROR,
  payload,
});

export const archiveActivityClear = () => ({
  type: ACTION_TYPES.ARCHIVE_ACTIVITY_CLEAR,
});

// Reset activity
export const resetActivity = () => ({
  type: ACTION_TYPES.RESET_ACTIVITY,
  payload,
});

export const resetActivitySuccess = (payload) => ({
  type: ACTION_TYPES.RESET_ACTIVITY_SUCCESS,
  payload,
});

export const resetActivityError = (payload) => ({
  type: ACTION_TYPES.RESET_ACTIVITY_ERROR,
  payload,
});

export const resetActivityClear = () => ({
  type: ACTION_TYPES.RESET_ACTIVITY_CLEAR,
});
