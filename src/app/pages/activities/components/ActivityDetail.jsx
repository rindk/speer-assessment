import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getActivityDetail } from '../activities.actions';

const ActivityDetail = () => {
  const dispatch = useDispatch();
  const activityDetail = useSelector((state) => state.activityDetail.data);

  useEffect(() => {
    dispatch(getActivityDetail(7830));
  }, []);

  return (
    <React.Fragment>
      {console.log('activityDetail: ', activityDetail)}
      <div>detail</div>
    </React.Fragment>
  );
};

export default ActivityDetail;
