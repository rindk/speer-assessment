import { combineReducers } from 'redux';
import apiController from './core/logger/api-controller.reducers';

export const appReducer = combineReducers({
  apiController,
});
