import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

const Page = () => {
  return (
    <Box className='container-view' position='relative'>
      <Outlet />
    </Box>
  );
};

export default Page;
