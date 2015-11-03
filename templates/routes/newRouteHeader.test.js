'use strict';
module.exports = ( options ) => {

return `/* eslint-env node, mocha */
'use strict';

const subject = require( '.${options.fileName}' )
    , assert = require( 'chai' ).assert
    , events = require('monument').events
    , fakeConnection = require('../test_stubs/connectionStub');

describe( '${options.fileName} route file tests', () => {
    beforeEach( () => {
        fakeConnection.reset();
    } );`;
};
