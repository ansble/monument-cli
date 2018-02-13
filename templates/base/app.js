'use strict';

const monument = require('monument'),
      port = process.env.PORT || 3000;

require('./templates');

monument.server({
  routePath: './routes',
  templatePath: './templates',
  publicPath: './public',
  port: port
});
