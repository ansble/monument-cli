'use strict';
module.exports = (options) => {

  return `/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert,
      events = require('monument').events,
      fakeConnection = require('../test_stubs/connectionStub');

require('.${options.fileName}');

describe('${options.fileName} route file tests', () => {
  beforeEach(() => {
    fakeConnection.reset();
  });`;
};
