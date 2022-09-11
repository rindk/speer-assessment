import React from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

import { Box, Typography, Stack, Divider, Button } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import DirectionsIcon from '@mui/icons-material/Directions';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

import { callType } from '../../../core/shared/constant';
import CallTypeIcon from './CallTypeIcon';
import { formatTimeFromNumber } from '../../../core/shared/functions';
import { archiveActivity } from '../activities.actions';

const ActivityDetailContent = ({ data }) => {
  const dispatch = useDispatch();

  const handleArchiveActivity = (id, isArchive) => {
    dispatch(archiveActivity(id, !isArchive));
  };

  return (
    <React.Fragment>
      <Stack border='1px solid #c0c0c0' borderRadius='6px' p={2}>
        <Typography variant='subtitle1' textAlign='center' fontWeight='bold'>
          {data?.from}
        </Typography>
        <Box my={1}>
          <Divider />
        </Box>
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='end'
          mb={1}
        >
          <CallTypeIcon direction={data?.direction} type={data?.call_type} />
          <Typography variant='caption' ml={2} component='p'>
            {`${data?.to}${
              data?.call_type === callType.voice
                ? ' received the voice mail'
                : data?.call_type === callType.missed
                ? ` missed the ${data?.direction} call`
                : ` answered the ${data?.direction} call`
            }`}
          </Typography>
        </Stack>
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='end'
          mb={1}
        >
          <DirectionsIcon htmlColor='#8c8c8c' />
          <Typography variant='caption' ml={2} component='p'>
            {`via ${data?.via}`}
          </Typography>
        </Stack>
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='end'
          mb={1}
        >
          <DateRangeIcon htmlColor='#8c8c8c' />
          <Typography variant='caption' ml={2} component='p'>
            {format(new Date(data?.created_at), 'iiii, LLL dd yyyy')}
          </Typography>
        </Stack>
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='end'
          mb={1}
        >
          <HourglassBottomIcon htmlColor='#8c8c8c' />
          <Typography variant='caption' ml={2} component='p'>
            {formatTimeFromNumber(Number(data?.duration))}
          </Typography>
        </Stack>
      </Stack>
      <Button
        fullWidth={true}
        variant='contained'
        sx={{ mt: 2 }}
        onClick={() => handleArchiveActivity(data?.id, data?.is_archived)}
      >
        <Stack direction='row' alignItems='center' justifyContent='center'>
          {data?.is_archived ? <UnarchiveIcon /> : <ArchiveIcon />}
          <Typography variant='button' ml={2}>
            {data?.is_archived ? 'UNARCHIVE' : 'ARCHIVE'}
          </Typography>
        </Stack>
      </Button>
    </React.Fragment>
  );
};

export default ActivityDetailContent;
