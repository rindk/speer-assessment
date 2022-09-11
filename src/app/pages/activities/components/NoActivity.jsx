import React from 'react';

import { Typography, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const NoActivity = () => {
  return (
    <Stack mt={5} justifyContent='center' alignItems='center' fontSize='60px'>
      <InfoIcon fontSize='inherit' color='info' />
      <Typography variant='body2' color='info'>
        No activity
      </Typography>
    </Stack>
  );
};

export default NoActivity;
