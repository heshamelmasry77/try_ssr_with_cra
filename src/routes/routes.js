import React from 'react';
import loadable from 'loadable-components';
import Loadable from 'react-loadable';

export const About = loadable(() => import('./About/index'));
export const HomePage = loadable(() => import('./Home/index'));
export const NotFound = loadable(() => import('./NotFound/index'));
//
// export const About = Loadable({
//     loader: () => import('./About/index'),
//     loading: () => <div>loading...</div>,
//     modules: ['about']
// });
//
// export const HomePage = Loadable({
//     loader: () => import('./Home/index'),
//     loading: () => <div>loading...</div>,
//     modules: ['home']
// });
//
// export const NotFound = Loadable({
//     loader: () => import('./NotFound/index'),
//     loading: () => <div>loading...</div>,
//     modules: ['notfound']
// });
