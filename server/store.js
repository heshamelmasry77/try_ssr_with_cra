import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { END } from 'redux-saga';

import thunk from 'redux-thunk';
import rootReducer from '../src/reducers';

import createMemoryHistory from 'history/createMemoryHistory';

const sagaMiddleware = createSagaMiddleware();

// Create a store and history based on a path
const configStore = (initialState, path = '/') => {
  // We don't have a DOM, so let's create some fake history and push the current path
  const history = createMemoryHistory({ initialEntries: [path] });

  // All the middlewares
  const middleware = [thunk, routerMiddleware(history), sagaMiddleware];
  const composedEnhancers = compose(applyMiddleware(...middleware));

  // Store it all
  const store = createStore(rootReducer, initialState, composedEnhancers);


    store.runSaga = sagaMiddleware.run;

    store.close = () => store.dispatch(END);

  // Return all that I need
  return {
    history,
    store
  };
};

export default configStore;
