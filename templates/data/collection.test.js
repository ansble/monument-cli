'use strict';
module.exports = (dataName) => {

    return `/* eslint-env node, mocha */
'use strict';

const subject = require('./${dataName}.js')
    , assert = require('chai').assert
    , events = require('monument').events;

describe('${dataName} Collection tests', () => {
    it('should respond to data:get:${dataName} passed an id', (done) => {
        events.once('data:set:${dataName}:123', (data) => {
            assert.isObject(data);
            done();
        });

        events.emit('data:get:${dataName}', 123);
    });

    it('should respond to data:get:${dataName} with no id', (done) => {
        events.once('data:set:${dataName}', (data) => {
            assert.isArray(data);
            done();
        });

        events.emit('data:get:${dataName}');
    });
});`;
};
