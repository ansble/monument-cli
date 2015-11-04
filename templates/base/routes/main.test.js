/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , events = require('monument').events
    , fakeConnection = require('../test_stubs/connectionStub')

    , response = '<!doctype html><html lang="en"> <head> </head> <body> <h1>Welcome to monument</h1> <p>"It never gets easier, you just go faster" - Greg Lemond</p> <p> You are on version 1.0.0 of your project</p> </body></html>';

// initialize the code to be tested
require('./main');

describe('main route file tests', () => {
    beforeEach(() => {
        fakeConnection.reset();
    });

    it('should respond to route:/:get', () => {
        events.emit('route:/:get', fakeConnection);

        assert.strictEqual(fakeConnection.out().response, response);
    });
});
