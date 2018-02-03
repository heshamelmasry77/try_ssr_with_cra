import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { appReducer } from './app';

export default combineReducers({
    routing: routerReducer,
    app: appReducer
});
