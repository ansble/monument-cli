/* eslint-env node, mocha */
'use strict';

const subject = require('./newProject'),
      assert = require('chai').assert;

describe('New Project module tests', () => {
  it('should return a function', () => {
    assert.isFunction(subject);
  });
});
