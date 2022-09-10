const makeActionTypes = (type) => ({
  [`${type}`]: type,
  [`${type}_SUCCESS`]: `${type}_SUCCESS`,
  [`${type}_ERROR`]: `${type}_ERROR`,
  [`${type}_CLEAR`]: `${type}_CLEAR`,
});

const ACTION_TYPES = {
  ...makeActionTypes('API_PROCESSING'),
  ...makeActionTypes('GET_ACTIVITY_FEED'),
  ...makeActionTypes('GET_ACTIVITY_DETAIL'),
  ...makeActionTypes('ARCHIVE_ACTIVITY'),
  ...makeActionTypes('RESET_ACTIVITY'),
};

export default ACTION_TYPES;
