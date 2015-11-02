/* eslint-env node, mocha */
'use strict';

const subject = require( './checkForProject' )
    , assert = require( 'chai' ).assert;

describe( 'Check For Project tests', () => {
    it( 'should return a function', () => {
        assert.isFunction( subject );
    } );

    it( 'should return false if it is not a monument project', () => {
        assert.strictEqual( subject( './test_stubs/non-monument-project' ), false );
    } );

    it( 'should return true if it is a monument project', () => {
        assert.strictEqual( subject( './test_stubs/monument-project' ), true );
    } );

    it( 'should return false if it is an empty folder', () => {
        assert.strictEqual( subject( './test_stubs/empty-folder' ), false );
    } );
} );
