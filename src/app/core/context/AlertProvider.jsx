import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Alert, AlertTitle, Snackbar } from '@mui/material';

const AlertContext = React.createContext({
  setAlert: (data) => data,
});

// Create `useAlert` hook that using AlertContext
const useAlert = () => {
  const context = React.useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within a AlertContext');
  }
  return context;
};

const AlertComponent = ({ alert, onClick }) => {
  const {
    type,
    icon,
    title,
    text,
    afterClick,
    variant,
    duration,
    vertical,
    horizontal,
  } = alert;

  const onClickAlert = (value) => {
    onClick();
    if (value) {
      afterClick();
    }
  };

  return (
    <Snackbar
      open={!!alert}
      autoHideDuration={duration || 3000}
      anchorOrigin={{
        vertical: vertical || 'top',
        horizontal: horizontal || 'right',
      }}
      onClose={() => onClickAlert(false)}
    >
      <Alert
        severity={type}
        icon={icon}
        variant={variant || 'filled'}
        sx={{ width: '100%' }}
        onClose={!!afterClick ? () => onClickAlert(afterClick) : null}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {text}
      </Alert>
    </Snackbar>
  );
};

const AlertProvider = (props) => {
  const [alert, setAlert] = useState(null);

  const onClick = useCallback(() => {
    setAlert(null);
  }, [setAlert]);

  const apiLogger = useSelector((state) => state.apiController);
  const errorLogger = apiLogger.error;
  const successLogger = apiLogger.success;

  useEffect(() => {
    if (errorLogger) {
      setAlert({
        type: 'error',
        text: errorLogger?.message,
      });
    }
  }, [errorLogger]);

  useEffect(() => {
    if (successLogger) {
      setAlert({
        type: 'success',
        text: successLogger?.message,
      });
    }
  }, [successLogger]);

  return (
    <AlertContext.Provider value={{ setAlert, onClick }} {...props}>
      {props.children}
      <Suspense fallback={<React.Fragment></React.Fragment>}>
        {alert && <AlertComponent alert={alert} onClick={onClick} />}
      </Suspense>
    </AlertContext.Provider>
  );
};

export { AlertProvider, useAlert };
