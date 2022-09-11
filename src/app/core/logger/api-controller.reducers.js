import { createReducer } from '../helper/reducer-factory';
import ACTION_TYPES from '../config/actions';

const initialState = {
  isProcessing: false,
  hasError: false,
  success: null,
  error: null,
};

const apiProcessing = (state, payload) => ({
  ...state,
  isProcessing: true,
  hasError: false,
  success: null,
  error: null,
});

const apiProcessingSuccess = (state, payload) => ({
  ...state,
  isProcessing: false,
  success: payload,
});

const apiProcessingError = (state, payload) => ({
  ...state,
  isProcessing: false,
  hasError: true,
  error: payload,
});

const apiProcessingClear = (state, payload) => ({
  ...state,
  isProcessing: false,
  hasError: false,
  success: null,
  error: null,
});

const strategies = {
  [ACTION_TYPES.API_PROCESSING]: apiProcessing,
  [ACTION_TYPES.API_PROCESSING_SUCCESS]: apiProcessingSuccess,
  [ACTION_TYPES.API_PROCESSING_ERROR]: apiProcessingError,
  [ACTION_TYPES.API_PROCESSING_CLEAR]: apiProcessingClear,
  __default__: (state) => state,
};

const apiController = createReducer(strategies, initialState);

export default apiController;
