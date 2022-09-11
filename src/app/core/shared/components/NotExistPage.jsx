import React from 'react';

import { Box, IconButton, Stack, Typography } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';

const NotExistPage = () => {
  return (
    <Stack mt={5} justifyContent='center' alignItems='center' fontSize='60px'>
      <BlockIcon fontSize='inherit' color='error' />
      <Typography variant='body2' mt={1} color='error'>
        Page not exist
      </Typography>
    </Stack>
  );
};

export default NotExistPage;
