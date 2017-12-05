/* eslint-env node, mocha */
'use strict';

const test = require('ava'),
      events = require('monument').events,
      fakeConnection = require('../test_stubs/connectionStub');

require('./test');

test.beforeEach(() => {
  fakeConnection.reset();
});

  test.cb('should respond to route:/test:get', (t) => {
    fakeConnection.done(() => {
      t.is(fakeConnection.out().response, 'route /test now responding to get requests');
      t.end();
    });

    events.emit('route:/test:get', fakeConnection);
  });

  test.cb('should respond to route:/test:put', (t) => {
    fakeConnection.done(() => {
      t.is(fakeConnection.out().response, 'route /test now responding to put requests');
      t.end();
    });

    events.emit('route:/test:put', fakeConnection);
  });

  test.cb('should respond to route:/test:post', (t) => {
    fakeConnection.done(() => {
      t.is(fakeConnection.out().response, 'route /test now responding to post requests');
      t.end();
    });

    events.emit('route:/test:post', fakeConnection);
  });