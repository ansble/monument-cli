'use strict';

const test = require('ava'),
      subject = require('./newProject');

test('should return a function', (t) => {
  t.is(typeof subject, 'function');
});
