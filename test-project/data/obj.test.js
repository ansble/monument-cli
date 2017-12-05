'use strict';

const test = require('ava'),
      events = require('monument').events;

require('./obj.js');

test.cb('should respond to data:get:obj', (t) => {
  events.once('data:set:obj', (data) => {
    t.is(typeof data, 'object');
    t.end();
  });

  events.emit('data:get:obj');
});