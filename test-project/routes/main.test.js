'use strict';

const test = require('ava'),
      events = require('monument').events,
      fakeConnection = require('../test_stubs/connectionStub'),

      response = '<!doctype html><html lang="en"> <head> </head> <body> <h1>Welcome to monument</h1> <p>"It never gets easier, you just go faster" - Greg Lemond</p> <p> You are on version 1.0.0 of your project</p> </body></html>';

// initialize the code to be tested
require('./main');

test.beforeEach(() => {
  fakeConnection.reset();
});

test.cb('should respond to route:/:get', (t) => {
  fakeConnection.done(() => {
    t.is(fakeConnection.out().response, response);
    t.end();
  });

  events.emit('route:/:get', fakeConnection);
});
