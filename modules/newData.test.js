'use strict';

const subject = require('./newData'),
      test = require('ava');

test('should return a function', (t) => {
  t.is(typeof subject, 'function');
});
