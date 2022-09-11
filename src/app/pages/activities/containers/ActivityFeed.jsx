import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useLocation } from 'react-router';

import { Box, CircularProgress, Typography, Stack } from '@mui/material';

import { getActivityFeed, getActivityFeedClear } from '../activities.actions';
import ActivityFeedItem from '../components/ActivityFeedItem';
import NoActivity from '../components/NoActivity';
import NavBar from '../../../core/shared/components/NavBar';
import SpeedDialAtFeed from '../components/SpeedDial';

const ActivityFeed = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isLoading = useSelector((state) => state.activityFeed.isLoading);

  const activityFeed = useSelector((state) => state.activityFeed.data);
  const renderFeed = useMemo(
    () =>
      activityFeed?.map((item) => ({
        date: item.date,
        data: item?.data?.filter((el) =>
          pathname.includes('archived') ? el?.is_archived : !el?.is_archived
        ),
      })),
    [activityFeed, pathname]
  );
  const totalRenderFeed = useMemo(
    () =>
      activityFeed?.reduce((total, item) => {
        const temp = item?.data?.reduce(
          (temp, el) =>
            (temp += (
              pathname.includes('archived') ? !el?.is_archived : el?.is_archived
            )
              ? 0
              : 1),
          0
        );
        total += temp;
        return total;
      }, 0),
    [activityFeed, pathname]
  );

  useEffect(() => {
    if (!activityFeed) {
      dispatch(getActivityFeed());
    }

    return () => dispatch(getActivityFeedClear());
  }, []);

  return (
    <React.Fragment>
      <Box py={2} minHeight='calc(100% - 32px - 56px)'>
        <NavBar
          hasBackBtn={pathname.includes('archived')}
          title={
            pathname.includes('archived')
              ? 'Archived activities'
              : 'Activity Feed'
          }
        />
        {isLoading ? (
          <Box py={2} textAlign='center'>
            <CircularProgress color='inherit' />
          </Box>
        ) : totalRenderFeed ? (
          <Stack mt={3} spacing={3} px={2}>
            {renderFeed?.map(
              (item) =>
                !!item?.data?.length && (
                  <Box key={item?.date}>
                    <Typography
                      variant='body1'
                      textAlign='center'
                      color='#8c8c8c'
                    >
                      {format(new Date(item?.date), 'MMMM, dd yyyy ')}
                    </Typography>
                    <Stack mt={1.5} spacing={2}>
                      {item?.data?.map((activity) => (
                        <ActivityFeedItem
                          key={activity?.created_at}
                          data={activity}
                        />
                      ))}
                    </Stack>
                  </Box>
                )
            )}
          </Stack>
        ) : (
          <NoActivity />
        )}
      </Box>
      {!pathname.includes('archived') && <SpeedDialAtFeed />}
    </React.Fragment>
  );
};

export default ActivityFeed;
