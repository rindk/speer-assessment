import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import {
  getActivityDetail,
  getActivityDetailClear,
} from '../activities.actions';
import NavBar from '../../../core/shared/components/NavBar';
import NotExistPage from '../../../core/shared/components/NotExistPage';
import ActivityDetailContent from '../components/ActivityDetailContent';

const ActivityDetail = () => {
  const dispatch = useDispatch();
  const { activityId } = useParams();

  const isLoading = useSelector((state) => state.activityDetail.isLoading);
  const error = useSelector((state) => state.activityDetail.error);
  const activityDetail = useSelector((state) => state.activityDetail.data);

  useEffect(() => {
    dispatch(getActivityDetail(activityId));

    return () => dispatch(getActivityDetailClear());
  }, []);

  return (
    <Box py={2}>
      <NavBar hasBackBtn={true} title='Activity Detail' to='/activity' />
      {isLoading ? (
        <Box py={2} textAlign='center'>
          <CircularProgress color='inherit' />
        </Box>
      ) : (
        <Box mt={3} px={2}>
          {error || !Number.isInteger(Number(activityId)) ? (
            <NotExistPage />
          ) : (
            !!activityDetail && <ActivityDetailContent data={activityDetail} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default ActivityDetail;
