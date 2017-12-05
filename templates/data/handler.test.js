'use strict';
module.exports = (dataName) => {

  return `'use strict';

const test = require('ava'),
      events = require('monument').events;

require('./${dataName}.js');

test.cb('should respond to data:get:${dataName}', (t) => {
  events.once('data:set:${dataName}', (data) => {
    t.is(typeof data, 'object');
    t.end();
  });

  events.emit('data:get:${dataName}');
});`;
};
