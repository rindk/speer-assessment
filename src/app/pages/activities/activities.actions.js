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
export const archiveActivity = (id, isArchive, needReload = false) => ({
  type: ACTION_TYPES.ARCHIVE_ACTIVITY,
  payload: { id, isArchive, needReload, isProcessing: true },
});

export const archiveActivitySuccess = (isArchive) => ({
  type: ACTION_TYPES.RESET_ACTIVITY_SUCCESS,
  payload: {
    success: {
      message: `${isArchive ? 'Archived' : 'Unarchived'} successfully`,
    },
  },
});

export const archiveActivityError = () => ({
  type: ACTION_TYPES.RESET_ACTIVITY_ERROR,
  payload: { error: { message: 'Error' } },
});

// Reset activity
export const resetActivity = () => ({
  type: ACTION_TYPES.RESET_ACTIVITY,
  payload: { isProcessing: true },
});

export const resetActivitySuccess = () => ({
  type: ACTION_TYPES.RESET_ACTIVITY_SUCCESS,
  payload: { success: { message: 'Reset successfully' } },
});

export const resetActivityError = () => ({
  type: ACTION_TYPES.RESET_ACTIVITY_ERROR,
  payload: { error: { message: 'Error' } },
});
