import 'regenerator-runtime/runtime';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';

import { environment } from './core/config/environment';
import {
  apiProcessingLogger,
  apiErrorLogger,
  apiSuccessLogger,
} from './core/logger/api-logger';
import Header from './layout/Header.jsx';
import appRoutes from './app.routes';
import { DialogProvider } from './core/context/DialogProvider';
import { appReducer } from './app.reducers';
import appMiddleware from './app.middleware';
import { renderRoute } from './core/helper/renderRoute';
import { AlertProvider } from './core/context/AlertProvider';

const middleware = createSagaMiddleware();
const middlewareArray = [
  middleware,
  apiErrorLogger,
  apiSuccessLogger,
  apiProcessingLogger,
];

let middlewareApply = middlewareArray;
if (environment.isDevelopment) {
  middlewareApply = [...middlewareApply, logger];
}

const store = createStore(appReducer, applyMiddleware(...middlewareApply));

middleware.run(appMiddleware);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<React.Fragment></React.Fragment>}>
          <AlertProvider>
            <DialogProvider>
              <div className='container'>
                <Header />
                <Routes>{renderRoute(appRoutes)}</Routes>
              </div>
            </DialogProvider>
          </AlertProvider>
        </Suspense>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
