'use strict';

const test = require('ava'),
      events = require('monument').events;

require('./coll.js');

test.cb('should respond to data:get:coll passed an id', (t) => {
  events.once('data:set:coll:123', (data) => {
    t.is(typeof data, 'object');
    t.end();
  });

  events.emit('data:get:coll', 123);
});

test.cb('should respond to data:get:coll with no id', (t) => {
  events.once('data:set:coll', (data) => {
    t.true(Array.isArray(data));
    t.end();
  });

  events.emit('data:get:coll');
});