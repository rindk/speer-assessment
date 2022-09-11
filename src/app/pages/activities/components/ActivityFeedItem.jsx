import React from 'react';
import { format } from 'date-fns';

import { Typography, Stack } from '@mui/material';

import CallTypeIcon from './CallTypeIcon';
import { callMsg } from '../../../core/shared/constant';
import PopupMenu from './PopupMenu';

const ActivityFeedItem = ({ data }) => {
  return (
    <Stack
      border='1px solid #c0c0c0'
      borderRadius='6px'
      p={1}
      direction='row'
      alignItems='center'
      justifyContent='space-between'
    >
      <CallTypeIcon direction={data?.direction} type={data?.call_type} />
      <Stack mx={2} width='100%'>
        <Typography variant='subtitle1'>{data?.from}</Typography>
        <Typography variant='body2' color='#8c8c8c'>
          {callMsg[data?.call_type] + ' '}
          {data?.to}
        </Typography>
      </Stack>
      <Stack alignItems='center'>
        <PopupMenu data={data} />
        <Typography variant='caption'>
          {format(new Date(data?.created_at ?? null), 'HH:mm')}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ActivityFeedItem;
