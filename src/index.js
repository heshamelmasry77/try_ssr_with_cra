import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { loadComponents } from 'loadable-components';

import { Provider as ReduxProvider } from 'react-redux'
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import './index.css';
import App from './App';
import configStore from './store/store';

import registerServiceWorker from './registerServiceWorker';

const initialState = window.REDUX_STATE;
const { store, history} = configStore(initialState || {});

delete window.REDUX_STATE;

const AppBundle = (
    <ReduxProvider store={store}>
        <ConnectedRouter history={history}>
            <Route component={App} />
        </ConnectedRouter>
    </ReduxProvider>
);
loadComponents().then(() => {
    ReactDOM.hydrate(
        AppBundle,
        document.getElementById('root')
    );
})
// registerServiceWorker();

//
// window.onload = () => {
//     Loadable.preloadReady().then(() => {
//         ReactDOM.hydrate(
//             AppBundle,
//             document.getElementById('root')
//         );
//     });
//     registerServiceWorker();
// };
