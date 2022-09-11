import React from 'react';

import { Box } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallMissedIcon from '@mui/icons-material/CallMissed';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { callDirection, callType } from '../../../core/shared/constant';

const CallTypeIcon = ({ direction, type }) => {
  const callIcon = {
    [callDirection.in]: {
      [callType.voice]: <ArrowDownwardIcon color='info' fontSize='inherit' />,
      [callType.missed]: <CallMissedIcon color='error' fontSize='inherit' />,
      [callType.answered]: (
        <CallReceivedIcon color='success' fontSize='inherit' />
      ),
    },
    [callDirection.out]: {
      [callType.voice]: <ArrowUpwardIcon color='info' fontSize='inherit' />,
      [callType.missed]: (
        <CallMissedOutgoingIcon color='error' fontSize='inherit' />
      ),
      [callType.answered]: <CallMadeIcon color='success' fontSize='inherit' />,
    },
  };

  return (
    <Box position='relative'>
      {type === callType.voice ? (
        <VoicemailIcon htmlColor='#8c8c8c' />
      ) : (
        <PhoneIcon htmlColor='#8c8c8c' />
      )}
      <Box
        position='absolute'
        top={type === callType.voice ? -3 : 0}
        right={type === 'voicemail' ? '50%' : 0}
        fontSize='12px'
        sx={{ transform: type === callType.voice ? 'translateX(50%)' : '' }}
      >
        {callIcon[direction][type]}
      </Box>
    </Box>
  );
};

export default CallTypeIcon;
