'use strict';
module.exports = (dataName) => {

  return `'use strict';

const test = require('ava'),
      events = require('monument').events;

require('./${dataName}.js');

test.cb('should respond to data:get:${dataName} passed an id', (t) => {
  events.once('data:set:${dataName}:123', (data) => {
    t.is(typeof data, 'object');
    t.end();
  });

  events.emit('data:get:${dataName}', 123);
});

test.cb('should respond to data:get:${dataName} with no id', (t) => {
  events.once('data:set:${dataName}', (data) => {
    t.true(Array.isArray(data));
    t.end();
  });

  events.emit('data:get:${dataName}');
});`;
};
