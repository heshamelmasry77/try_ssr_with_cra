import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';

import { Route } from 'react-router-dom';
// import our main App component
import App from '../../src/App';
const path = require("path");
const fs = require("fs");

import manifest from '../../build/asset-manifest.json';


export default (store, history) => (req, res, next) => {
    // point to the html file created by CRA's build tool
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }
        const modules = [];

        // render the app as a string
        const html = ReactDOMServer.renderToString(
            <Loadable.Capture report={m => modules.push(m)}>
                <ReduxProvider store={store}>
                    <ConnectedRouter history={history}>
                        <Route component={App} />
                    </ConnectedRouter>
                </ReduxProvider>
            </Loadable.Capture>
        );
        const reduxState = JSON.stringify(store.getState());

        const extractAssets = (assets, chunks) => Object.keys(assets)
            .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
            .map(k => assets[k]);
        const extraChunks = extractAssets(manifest, modules)
            .map(c => `<script type="text/javascript" src="/${c}"></script>`);
        // inject the rendered app into our html and send it
        return res.send(
            htmlData.replace(
                '<div id="root"></div>',
                `<div id="root">${html}</div>`
            ).replace(
                '</body>',
                extraChunks.join('') + '</body>'
            ).replace('__SERVER_REDUX_STATE__', reduxState)
        );
    });
}