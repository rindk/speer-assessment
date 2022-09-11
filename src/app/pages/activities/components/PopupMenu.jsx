import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import {
  Box,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import ArchiveIcon from '@mui/icons-material/Archive';

import { archiveActivity } from '../activities.actions';

const PopupMenu = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.target);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const iconButtonTabs = [
    {
      text: 'View call detail',
      icon: <InfoIcon htmlColor='#8c8c8c' />,
      action: () => navigate(`/activity/${data?.id}`),
    },
    {
      text: data?.is_archived ? 'Unarchive' : 'Archive',
      icon: <ArchiveIcon htmlColor='#8c8c8c' />,
      action: () => handleArchiveActivity(data?.id, data?.is_archived),
    },
  ];

  const handleArchiveActivity = (id, isArchive) => {
    dispatch(archiveActivity(id, !isArchive, true));
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted={false}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Stack px={1}>
          {iconButtonTabs.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                handleClose();
                item.action();
              }}
              sx={{ p: 2, py: 1.5 }}
            >
              <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
              >
                {item.icon}
                <Typography variant='subtitle2' ml={1.5}>
                  {item.text}
                </Typography>
              </Stack>
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </Box>
  );
};

export default PopupMenu;
