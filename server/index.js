import React from 'react'
import Loadable from 'react-loadable';
import ReactDOMServer, { renderToNodeStream,renderToStaticNodeStream }  from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux'
import { StaticRouter, Route, matchPath } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { getLoadableState } from 'loadable-components/server';
import { Helmet } from 'react-helmet';

import App from '../src/App';
import configStore from './store';

import indexController, { actionIndex } from './controllers/index';
import { setMessage, setAsyncMessage } from '../src/reducers/app';

import sagas from '../src/sagas';
import {renderFooter, renderHeader} from './renderTpl';
import manifest from '../build/asset-manifest.json';

const path = require('path');
const fs = require("fs");
const express = require('express');
const compression = require('compression');

const PORT = 3001;
// initialize the application and create the routes
const app = express();

// Compress, parse, and log
app.use(compression());

// app.use('/',indexController);
app.use(express.static(
    path.resolve(__dirname, '..', 'build/'),
    {index: '_'}
    // { maxAge: '30d' },
));
// app.use('/',actionIndex);

app.get('*', async (req, res) => {
    const { store, history } = configStore({}, req.path);
    const context = {};
    {/*<StaticRouter history={history} location={req.url} context={context}>*/}
    const appWithRouter = (
        <ReduxProvider store={store} >
            <ConnectedRouter history={history} location={req.url} context={context}>
                <Route component={App} />
            </ConnectedRouter>
        </ReduxProvider>
    );

    if (context.url) {
        res.redirect(context.url);
        return;
    }
    let loadableState = {};

    setTimeout(function () {
        //do something once
        const modules = [];
        const extractAssets = (assets, chunks, type) => Object.keys(assets)
            .filter(asset => {
                return asset.indexOf(type) > -1 && asset.indexOf('.map') === -1
            })
            .map(k => assets[k]);

        const extraCSS = extractAssets(manifest, {}, '.css')
            .map(c => `<link href="/${c}" rel="stylesheet">`);
        const helmet = Helmet.renderStatic();
        res.status(200).write(renderHeader(helmet, extraCSS));
        const preloadedState = store.getState();
        const htmlSteam = renderToNodeStream(appWithRouter);

        const extraChunks = extractAssets(manifest, {}, '.js')
            .filter(c => c.indexOf('main') !== -1)
            .map(c => `<script type="text/javascript" src="/${c}"></script>`);
        htmlSteam.pipe(res, { end: false });
        htmlSteam.on('end', () => {
            // console.log('loadableState ', loadableState.getScriptTag())
            res.write(renderFooter(extraChunks, loadableState, preloadedState));
            return res.send();
        });
    }, 1000);
    // store.runSaga(sagas).done.then(() => {
    //
    // });

    // Trigger sagas for component to run
    // https://github.com/yelouafi/redux-saga/issues/255#issuecomment-210275959
    loadableState = await getLoadableState(appWithRouter);

    // Dispatch a close event so sagas stop listening after they're resolved
    store.close();
});


Loadable.preloadAll().then(() => {
    app.listen(PORT, (error) => {
        console.log("listening on " + PORT + "...");
    });
});

// app.listen(3000, () => console.log('Demo app listening on port 3000'));
