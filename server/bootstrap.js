process.env.NODE_ENV = "production";
require('ignore-styles');
require('babel-polyfill')
require('babel-register')({
    ignore: [ /(node_modules)/ ],
    presets: ['es2015', 'react-app'],
    plugins: [
        'syntax-dynamic-import',
        'dynamic-import-node',
        'react-loadable/babel'
    ]
});
require('./index');