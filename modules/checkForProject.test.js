/* eslint-env node, mocha */
'use strict';

const subject = require('./checkForProject'),
      test = require('ava'),

      fs = require('fs'),
      path = require('path');

try {
  fs.mkdirSync(path.join(process.cwd(), './test_stubs/empty-folder'));
} catch (err) {
  console.log('empty-test folder exists');
}

test('should return a function', (t) => {
  t.is(typeof subject, 'function');
});

test('should return false if it is not a monument project', (t) => {
  t.is(subject('./test_stubs/non-monument-project'), false);
});

test('should return true if it is a monument project', (t) => {
  t.is(subject('./test_stubs/monument-project'), true);
});

test('should return false if it is an empty folder', (t) => {
  t.is(subject('./test_stubs/empty-folder'), false);
});
