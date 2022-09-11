import React from 'react';

import { Box, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router';

const NavBar = ({ hasBackBtn = false, title, to = '/' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };
  return (
    <Stack
      direction='row'
      justifyContent='center'
      alignItems='center'
      px={2}
      position='relative'
    >
      {hasBackBtn && (
        <Box position='absolute' left='16px'>
          <IconButton onClick={handleClick}>
            <ArrowBackIosNewIcon color='success' fontSize='small' />
          </IconButton>
        </Box>
      )}
      <Typography variant='h6' textAlign='center'>
        {title}
      </Typography>
    </Stack>
  );
};

export default NavBar;
