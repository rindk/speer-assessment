import React from 'react';

import { Typography, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const NoActivity = () => {
  return (
    <Stack mt={3} justifyContent='center' alignItems='center' fontSize='40px'>
      <InfoIcon fontSize='inherit' color='info' />
      <Typography variant='body2'>No activity</Typography>
    </Stack>
  );
};

export default NoActivity;
