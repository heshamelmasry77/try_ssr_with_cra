import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { END } from 'redux-saga';

import thunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory';

import rootReducer from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

// Create a store and history based on a path
const configStore = (initialState) => {
    // We don't have a DOM, so let's create some fake history and push the current path
  const history = createBrowserHistory();

  // All the middlewares
  const middleware = [thunk, routerMiddleware(history), sagaMiddleware];

  const composedEnhancers = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  // Store it all
  const store = createStore(rootReducer, initialState, composedEnhancers);


// then run the saga
    sagaMiddleware.run(sagas);

  // Return all that I need
  return {
    history,
    store
  };
};

export default configStore;
