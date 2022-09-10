import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getActivityFeed } from '../activities.actions';

const ActivityFeed = () => {
  const dispatch = useDispatch();

  const activityFeed = useSelector((state) => state.activityFeed.data);

  useEffect(() => {
    dispatch(getActivityFeed());
  }, []);

  return (
    <React.Fragment>
      {console.log('activityFeed: ', activityFeed)}
      <div>feed</div>
    </React.Fragment>
  );
};

export default ActivityFeed;
