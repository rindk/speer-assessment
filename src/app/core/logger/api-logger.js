import ACTION_TYPES from '../config/actions';

export function apiProcessingLogger(store) {
  return (next) => (action) => {
    if (action.payload) {
      const { isProcessing } = action.payload;
      if (isProcessing) {
        // Dispatch processing redux
        store.dispatch({
          type: ACTION_TYPES.API_PROCESSING,
        });
      } else {
        if (store.getState().apiController?.isProcessing) {
          store.dispatch({
            type: ACTION_TYPES.API_PROCESSING_CLEAR,
          });
        }
      }
    }
    return next(action);
  };
}

export function apiErrorLogger(store) {
  return (next) => (action) => {
    if (action.payload) {
      const { error } = action.payload;
      if (error) {
        // Dispatch error redux
        store.dispatch({
          type: ACTION_TYPES.API_PROCESSING_ERROR,
          payload: error,
        });
      } else {
        if (store.getState().apiController?.error) {
          store.dispatch({
            type: ACTION_TYPES.API_PROCESSING_CLEAR,
          });
        }
      }
    }
    return next(action);
  };
}

export function apiSuccessLogger(store) {
  return (next) => (action) => {
    if (action.payload) {
      const { success } = action.payload;
      if (success) {
        // Dispatch error redux
        store.dispatch({
          type: ACTION_TYPES.API_PROCESSING_SUCCESS,
          payload: success,
        });
      } else {
        if (store.getState().apiController?.success) {
          store.dispatch({
            type: ACTION_TYPES.API_PROCESSING_CLEAR,
          });
        }
      }
    }
    return next(action);
  };
}
