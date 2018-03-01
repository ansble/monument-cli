'use strict';

const events = require('monument').events,

      pkg = require('../package.json');

events.on('route:/:get', (connection) => {
  events.once('template:set:main.hbs', (template) => {
    connection.res.send(template({ version: pkg.version }));
  });

  events.emit('template:get', 'main.hbs');
});
