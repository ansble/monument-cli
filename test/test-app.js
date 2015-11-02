/* eslint-env node, mocha */
'use strict';

const path = require( 'path' )
    , assert = require( 'yeoman-generator' ).assert
    , helpers = require( 'yeoman-generator' ).test
    , os = require( 'os' );

describe( 'monumentjs-cli:app', () => {
    before( ( done ) => {
        helpers.run( path.join( __dirname, '../generators/app' ) )
            .inDir( path.join( os.tmpdir(), './temp-test' ) )
            .withOptions( { 'skip-install': true } )
            .withPrompt( {
                someOption: true
            } )
            .on( 'end', done );
    } );

    it( 'creates files', () => {
        assert.file( [
            'bower.json'
            , 'package.json'
            , '.editorconfig'
            , '.jshintrc'
            , 'gulpfile.js'
        ] );
    } );
} );
