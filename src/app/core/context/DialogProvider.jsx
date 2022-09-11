import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useSelector } from 'react-redux';

const DIALOG_TYPES = {
  PROCESSING: 'processing_dlg',
  CONFIRM: 'custom_confirm_dlg',
  COMPONENT: 'component_dlg',
};

const DialogContext = React.createContext({
  setDialog: (data) => data,
  onClosed: () => null,
});

// Create `useDialog` hook that using DialogContext
const useDialog = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

const DialogComponent = ({ dialog, onClosed }) => {
  const {
    data,
    className,
    type,
    component,
    afterClosed,
    disableEscapeKeyDown,
    fullScreen,
    fullWidth,
    onBackdropClick,
    disableBackDropClick,
  } = dialog;

  const onCloseDialog = (value) => {
    // Close dialog on DialogProvider
    onClosed();

    // Execure afterClosed callback fn on Component
    if (afterClosed) {
      afterClosed(value);
    }
  };

  const handleClose = (event, reason) => {
    if (disableBackDropClick && reason && reason === 'backdropClick') {
      return;
    }
    onClosed();
  };

  const dialogType = () => {
    switch (type) {
      case DIALOG_TYPES.CONFIRM:
        return (
          <Box sx={className}>
            {data.header && (
              <DialogTitle id='alert-dialog-title'>{data.header}</DialogTitle>
            )}
            {data.content && (
              <DialogContent>
                <DialogContentText
                  id='alert-dialog-description'
                  component='div'
                >
                  {data.content}
                </DialogContentText>
              </DialogContent>
            )}
            <DialogActions sx={{ margin: '8px 24px 20px' }}>
              {data.btn.cancel && (
                <Button
                  variant='outlined'
                  onClick={() => onCloseDialog(false)}
                  color='primary'
                >
                  {data.btn.cancel}
                </Button>
              )}
              <Button
                variant='contained'
                onClick={() => onCloseDialog(true)}
                color='primary'
              >
                {data.btn.ok}
              </Button>
            </DialogActions>
          </Box>
        );
      case DIALOG_TYPES.PROCESSING:
        return (
          <Backdrop
            sx={(theme) => ({
              zIndex: theme.zIndex.drawer + 1,
              color: '#fff',
            })}
            open={Boolean(dialog)}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        );
      case DIALOG_TYPES.COMPONENT:
        return <React.Fragment>{component}</React.Fragment>;
      default:
        return null;
    }
  };

  // Using createPortal for adding dialog as `<body> child`
  return createPortal(
    <Dialog
      fullScreen={fullScreen}
      disableEscapeKeyDown={disableEscapeKeyDown}
      onBackdropClick={onBackdropClick}
      fullWidth={fullWidth}
      open={Boolean(dialog)}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      {dialogType()}
    </Dialog>,
    document.body
  );
};

const DialogProvider = (props) => {
  const location = useLocation();
  const [dialog, setDialog] = useState(null);

  const onClosed = useCallback(() => {
    // Set null for DialogContext, that mean close Dialog Component on Provider
    setDialog(null);
  }, [setDialog]);

  // Close dialog if location is changed
  useEffect(() => {
    onClosed();
  }, [location]);

  // Get apiControllerReducer state
  const apiState = useSelector((state) => {
    return state.apiController;
  });

  useEffect(() => {
    if (apiState && apiState.isProcessing) {
      setDialog({
        type: DIALOG_TYPES.PROCESSING,
      });
    } else if (apiState && apiState.hasError) {
      // set dialog error in here
      setDialog(null);
    } else {
      setDialog(null);
    }
  }, [apiState]);

  return (
    <DialogContext.Provider value={{ setDialog, onClosed }} {...props}>
      {props.children}
      <Suspense fallback={<React.Fragment></React.Fragment>}>
        {dialog && <DialogComponent dialog={dialog} onClosed={onClosed} />}
      </Suspense>
    </DialogContext.Provider>
  );
};

export { DialogProvider, useDialog, DIALOG_TYPES };
