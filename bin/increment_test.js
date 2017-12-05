/* eslint-env node, mocha */
'use strict';

const test = require('ava'),
      increment = require('./increment');

test('should be a function', (t) => {
  t.is(typeof increment, 'function');
});

test('should increment only patch when incrementing patch', (t) => {
  t.is('1.2.4', increment('1.2.3', 'patch'));
});

test('should increment minor and roll patch when incrementing minor', (t) => {
  t.is('1.3.0', increment('1.2.3', 'minor'));
});

test('should increment major and roll minor and patch when incrementing major', (t) => {
  t.is('2.0.0', increment('1.2.3', 'major'));
});
