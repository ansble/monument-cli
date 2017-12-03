'use strict';
module.exports = (options) => {

  return `/* eslint-env node, mocha */
'use strict';

const test = require('ava'),
      events = require('monument').events,
      fakeConnection = require('../test_stubs/connectionStub');

require('.${options.fileName}');

test.beforeEach(() => {
  fakeConnection.reset();
});`;
};
