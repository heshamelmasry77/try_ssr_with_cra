// app.get('*', (req, res) => {
//     const { store, history } = configStore({});
//     const context = {};
//
//     const filePath = path.resolve(__dirname, '..', 'build', 'index.html');
//     fs.readFile(filePath, 'utf8', (err, htmlData) => {
//         if (err) {
//             console.error('err', err);
//             return res.status(404).end()
//         }
//
//         const app = (
//             <ReduxProvider store={store}>
//                 <StaticRouter history={history} location={req.url} context={context}>
//                     <Route component={App} />
//                 </StaticRouter>
//             </ReduxProvider>
//         )
//
//         if (context.url) {
//             // Somewhere a `<Redirect>` was rendered
//             console.log(`REDIRECTED! to ${context.url}`);
//             res.redirect(302, context.url);
//         }
//         const modules = [];
//         const html = ReactDOMServer.renderToString(app);
//         // if (context.url) {
//         //     res.redirect(context.url);
//         //     return;
//         // }
//
//         const reduxState = JSON.stringify(store.getState()) || {};
//         console.log('reduxState', reduxState)
//         const extractAssets = (assets, chunks) => Object.keys(assets)
//             .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
//             .map(k => assets[k]);
//         const extraChunks = extractAssets(manifest, modules)
//             .map(c => `<script type="text/javascript" src="/${c}"></script>`);
//         // inject the rendered app into our html and send it
//         getLoadableState(app).then(loadableState => {
//             // console.log(loadableState.getScriptTag())
//             res.set('content-type', 'text/html');
//             return res.send(
//                 htmlData.replace(
//                     '<div id="root"></div>',
//                     `<div id="root">${html}</div>`
//                 ).replace(
//                     '</body>',
//                     extraChunks + '</body>'
//                 )
//                     .replace('__SERVER_REDUX_STATE__', reduxState)
//             );
//         })
//
//     });
//
// });


// app.get('*', (req, res) => {
//     console.log(req)
//     const { store, history } = configStore({});
//     const context = {};
//     const filePath = path.resolve(__dirname, '..', 'build', 'index.html');
//     console.log('before readFile')
//     fs.readFile(filePath, 'utf8', (err, htmlData) => {
//         console.log('reading file...')
//         if (err) {
//             console.error('err', err);
//             return res.status(404).end()
//         }
//         const modules = [];
//         console.log('Read OK')
//         const app = (
//             <Loadable.Capture report={m => modules.push(m)}>
//                 <ReduxProvider store={store}>
//                     <StaticRouter history={history} location={req.url} context={context}>
//                         <Route component={App} />
//                     </StaticRouter>
//                 </ReduxProvider>
//             </Loadable.Capture>
//         )
//
//
//
//         const html = ReactDOMServer.renderToString(app);
//         console.log('context URL')
//
//         if (context.url) {
//             // Somewhere a `<Redirect>` was rendered
//             console.log(`REDIRECTED! to ${context.url}`);
//             res.redirect(302, context.url);
//         }
//
//         const reduxState = JSON.stringify(store.getState()) || {};
//         const extractAssets = (assets, chunks) => Object.keys(assets)
//             .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
//             .map(k => assets[k]);
//         const extraChunks = extractAssets(manifest, modules)
//             .map(c => `<script type="text/javascript" src="/${c}"></script>`);
//
//         return res.send(
//             htmlData
//                 .replace(
//                     '<div id="root"></div>',
//                     `<div id="root">${html}</div>`
//                 )
//                 .replace(
//                     '</body>',
//                     extraChunks.join('') + '</body>'
//                 ).replace('__SERVER_REDUX_STATE__', reduxState)
//         );
//         // inject the rendered app into our html and send it
//         // getLoadableState(app).then(loadableState => {
//         //     // console.log(loadableState.getScriptTag())
//         //     res.set('content-type', 'text/html');
//         //     return res.send(
//         //         htmlData.replace(
//         //             '<div id="root"></div>',
//         //             `<div id="root">${html}</div>`
//         //         ).replace(
//         //             '</body>',
//         //             extraChunks + '</body>'
//         //         )
//         //             .replace('__SERVER_REDUX_STATE__', reduxState)
//         //     );
//         // })
//
//     });
//
//
// });


// { itemprop: 'name', content: theTitle },
// { itemprop: 'description', content: theDescription },
// { itemprop: 'image', content: theImage },
// { name: 'description', content: theDescription },
// { name: 'twitter:card', content: 'summary_large_image' },
// { name: 'twitter:site', content: defaultTwitter },
// { name: 'twitter:title', content: theTitle },
// { name: 'twitter:description', content: theDescription },
// { name: 'twitter:creator', content: twitter || defaultTwitter },
// { name: 'twitter:image:src', content: theImage },
// { property: 'og:title', content: theTitle },
// { property: 'og:type', content: contentType || 'website' },
// { property: 'og:url', content: defaultUrl + pathname },
// { property: 'og:image', content: theImage },
// { property: 'og:description', content: theDescription },
// { property: 'og:site_name', content: defaultTitle },
// { property: 'fb:app_id', content: 'xxx' }