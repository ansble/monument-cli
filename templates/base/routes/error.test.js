/* eslint-env node, mocha */
'use strict';

const subject = require( './error' )
    , assert = require( 'chai' ).assert
    , events = require('monument').events
    , fakeConnection = require('../test_stubs/connectionStub')

    , response401 = '<!doctype html><html lang="en"> <head> </head> <body> <h1>You tried to access something you aren\'t allowed to. Punk.</h1> <h2></h2> </body></html>'
    , response404 = '<!doctype html><html lang="en"> <head> </head> <body> <h1>file not found</h1> <h2></h2> </body></html>'
    , response500Generic = '<!doctype html><html lang="en"> <head> </head> <body> <h1>server side error happened... sorry.</h1> <h2></h2> </body></html>';

describe( 'Error Handler Tests', () => {
    beforeEach( () => {
        fakeConnection.reset();
    } );

	it( 'should respond to error:401 with an unauthorized message', () => {
        let result;

        events.emit('error:401', fakeConnection);
        result = fakeConnection.out();
        
        assert.isObject( result.headers );
        assert.strictEqual( result.headers['Content-Type'], 'text/html' );
        assert.strictEqual( result.status, 401 );
        assert.strictEqual( result.response, response401 );
    } );

    it( 'should respond to error:404 with a missing file message', () => {
        let result;

        events.emit('error:404', fakeConnection);
        result = fakeConnection.out();
        
        assert.isObject( result.headers );
        assert.strictEqual( result.headers['Content-Type'], 'text/html' );
        assert.strictEqual( result.status, 404 );
        assert.strictEqual( result.response, response404 );
    } );

    it( 'should respond to error:500 with a server error', () => {
        let result;

        events.emit('error:500', {
            connection: fakeConnection
        });

        result = fakeConnection.out();
        
        assert.isObject( result.headers );
        assert.strictEqual( result.headers['Content-Type'], 'text/html' );
        assert.strictEqual( result.status, 500 );
        assert.strictEqual( result.response, response500Generic );
    } );

    it( 'should respond to error:500 with a server error', () => {
        const message = 'This was a bad idea';

        let result;

        events.emit('error:500', {
            connection: fakeConnection
            , message: message
        });

        result = fakeConnection.out();
        
        assert.isObject( result.headers );
        assert.strictEqual( result.headers['Content-Type'], 'text/html' );
        assert.strictEqual( result.status, 500 );
        assert.include( result.response, message );
    } );
} );