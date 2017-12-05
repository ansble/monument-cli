'use strict';
const events = require('monument').events;

events.on('route:/test:get', (connection) => {
  connection.res.send('route /test now responding to get requests');
});

events.on('route:/test:put', (connection) => {
  connection.res.send('route /test now responding to put requests');
});

events.on('route:/test:post', (connection) => {
  connection.res.send('route /test now responding to post requests');
});