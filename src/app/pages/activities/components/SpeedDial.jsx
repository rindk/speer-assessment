import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { resetActivity } from '../activities.actions';

const SpeedDialAtFeed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const actions = [
    {
      icon: <RestartAltIcon />,
      name: 'Reset',
      action: () => dispatch(resetActivity()),
    },
    {
      icon: <InventoryIcon />,
      name: 'Archived Box',
      action: () => navigate('archived'),
    },
  ];

  return (
    <SpeedDial
      ariaLabel='speed dial actions'
      sx={{
        position: 'sticky',
        bottom: 16,
        pr: 2,
        alignItems: 'end',
        flexDirection: 'row-reverse',
        '& .MuiSpeedDial-actions ': {
          flexDirection: 'row-reverse',
          pb: 0,
          mb: 0,
        },
      }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipPlacement={'top'}
          onClick={action.action}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialAtFeed;
