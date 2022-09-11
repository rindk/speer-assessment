import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import { Box, CircularProgress, Typography, Stack } from '@mui/material';

import { getActivityFeed } from '../activities.actions';
import ActivityFeedItem from '../components/ActivityFeedItem';
import NoActivity from '../components/NoActivity';

const ActivityFeed = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.activityFeed.isLoading);

  const activityFeed = useSelector((state) => state.activityFeed.data);
  const noArchiveFeed = useMemo(
    () =>
      activityFeed?.map((item) => ({
        date: item.date,
        data: item?.data?.filter((el) => !el?.is_archived),
      })),
    [activityFeed]
  );
  const totalNotArchive = useMemo(() =>
    activityFeed?.reduce((total, item) => {
      const temp = item?.data?.reduce(
        (temp, el) => (temp += el?.is_archived ? 0 : 1),
        0
      );
      total += temp;
      return total;
    }, 0)
  );

  useEffect(() => {
    dispatch(getActivityFeed());
  }, []);

  return (
    <Box py={2}>
      <Typography variant='h6' textAlign='center'>
        Activity Feed
      </Typography>
      {isLoading ? (
        <Box py={2} textAlign='center'>
          <CircularProgress color='inherit' />
        </Box>
      ) : totalNotArchive ? (
        <Stack mt={3} spacing={3} px={2}>
          {/* {noArchiveFeed?.map( */}
          {activityFeed?.map(
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
  );
};

export default ActivityFeed;
