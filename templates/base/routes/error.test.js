'use strict';
/* eslint-env node, mocha */
const assert = require('chai').assert,
      events = require('monument').events,
      fakeConnection = require('../test_stubs/connectionStub'),

      response401 = '<!doctype html><html lang="en"> <head> </head> <body> <h1>You tried to access something you aren\'t allowed to. Punk.</h1> <h2></h2> </body></html>',
      response404 = '<!doctype html><html lang="en"> <head> </head> <body> <h1>file not found</h1> <h2></h2> </body></html>',
      response500Generic = '<!doctype html><html lang="en"> <head> </head> <body> <h1>server side error happened... sorry.</h1> <h2></h2> </body></html>';

// Initialize the code to be tested
require('./error');

describe('Error Handler Tests', () => {
  beforeEach(() => {
    fakeConnection.reset();
    fakeConnection.res.statusCode = 200;
  });

  it('should respond to error:401 with an unauthorized message', (done) => {
    const statusCode = 401;

    let result;

    fakeConnection.done(() => {
      result = fakeConnection.out();
      assert.isObject(result.headers);
      assert.strictEqual(fakeConnection.res.statusCode, statusCode);
      assert.strictEqual(result.response, response401);
      done();
    });

    events.emit('error:401', fakeConnection);
  });

  it('should respond to error:404 with a missing file message', (done) => {
    const statusCode = 404;

    let result;

    fakeConnection.done(() => {
      result = fakeConnection.out();

      assert.isObject(result.headers);
      assert.strictEqual(fakeConnection.res.statusCode, statusCode);
      assert.strictEqual(result.response, response404);
      done();
    });

    events.emit('error:404', fakeConnection);
  });

  it('should respond to error:500 with a server error', (done) => {
    const statusCode = 500;

    let result;

    fakeConnection.done(() => {
      result = fakeConnection.out();

      assert.isObject(result.headers);
      assert.strictEqual(fakeConnection.res.statusCode, statusCode);
      assert.strictEqual(result.response, response500Generic);
      done();
    });

    events.emit('error:500', {
      connection: fakeConnection
    });

  });

  it('should respond to error:500 with a server error', (done) => {
    const message = 'This was a bad idea',
          statusCode = 500;

    let result;

    fakeConnection.done(() => {
      result = fakeConnection.out();

      assert.isObject(result.headers);
      assert.strictEqual(fakeConnection.res.statusCode, statusCode);
      assert.include(result.response, message);
      done();
    });

    events.emit('error:500', {
      connection: fakeConnection,
      message: message
    });
  });
});
