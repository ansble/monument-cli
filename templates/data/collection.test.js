'use strict';
module.exports = (dataName) => {

    return `/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , events = require('monument').events;

require('./${dataName}.js');

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
