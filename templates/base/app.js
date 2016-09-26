'use strict';

const monument = require('monument')
    , defaultPort = 3000;

monument.server({
    routePath: './routes'
    , templatePath: './templates'
    , publicPath: './public'
    , port: process.env.PORT || defaultPort
});
