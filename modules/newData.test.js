/* eslint-env node, mocha */
'use strict';

const subject = require('./newData'),
      assert = require('chai').assert;

describe('New Data module tests', () => {
  it('should return a function', () => {
    assert.isFunction(subject);
  });
});
