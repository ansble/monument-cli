'use strict';
module.exports = (dataName) => {

    return `/* eslint-env node, mocha */
'use strict';

const assert = require('chai').assert
    , events = require('monument').events;

require('./${dataName}.js');

describe('${dataName} Handler tests', () => {
    it('should respond to data:get:${dataName}', (done) => {
        events.once('data:set:${dataName}', (data) => {
            assert.isObject(data);
            done();
        });

        events.emit('data:get:${dataName}');
    });
});`;
};
