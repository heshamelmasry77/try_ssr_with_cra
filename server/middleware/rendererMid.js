import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import { StaticRouter, Route } from 'react-router-dom';
import { getLoadableState } from 'loadable-components/server';
import Helmet from 'react-helmet';

// import our main App component
import App from '../../src/App';
const path = require("path");
const fs = require("fs");

import manifest from '../../build/asset-manifest.json';


export default (store, history) => (req, res, next) => {
    const context = {};
    // point to the html file created by CRA's build tool
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }

        const app = (
            <ReduxProvider store={store}>
                <StaticRouter history={history} location={req.url} context={context}>
                    <Route component={App} />
                </StaticRouter>
            </ReduxProvider>
        )
        const modules = [];
        const html = ReactDOMServer.renderToString(app);
        if (context.url) {
            res.redirect(context.url);
            return;
        }

        const reduxState = JSON.stringify(store.getState()) || {};

        const extractAssets = (assets, chunks) => Object.keys(assets)
            .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
            .map(k => assets[k]);
        const extraChunks = extractAssets(manifest, modules)
            .map(c => `<script type="text/javascript" src="/${c}"></script>`);
        // Let Helmet know to insert the right tags
        const helmet = Helmet.renderStatic();
        const head =  helmet.title.toString() + helmet.meta.toString() + helmet.link.toString()
        // inject the rendered app into our html and send it
        const htmlRes = htmlData
            .replace('</head>', `${head}</head>`)
            .replace(
                '<div id="root"></div>',
                `<div id="root">${html}</div>`
            ).replace(
                '</body>',
                extraChunks + '</body>'
            ).replace('__SERVER_REDUX_STATE__', reduxState)
        return res.send(htmlRes);
    });
}
// loadableState.getScriptTag()