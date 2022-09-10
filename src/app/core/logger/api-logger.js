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
        if (store.getState().apiControllerReducer?.isProcessing) {
          store.dispatch({
            type: ACTION_TYPES.CLEAR_API_PROCESSING,
          });
        }
      }
    }
    return next(action);
  };
}
