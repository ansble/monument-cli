'use strict';

const emitter = require( 'monument' ).events
    , errorTemplate = require( '../templates/error' );

emitter.on( 'error:401', ( connection ) => {
    const errorCode = 401;

    connection.res.writeHead( errorCode, { 'Content-Type': 'text/html' } );
    connection.res.end( errorTemplate( {
        message: 'You tried to access something you aren\'t allowed to. Punk.'
        , explanation: ''
    } ) );
} );

emitter.on( 'error:404', ( connection ) => {
    const errorCode = 404;

    connection.res.writeHead( errorCode, { 'Content-Type': 'text/html' } );
    connection.res.end( errorTemplate( {
        message: 'file not found'
        , explanation: ''
    } ) );
} );

emitter.on( 'error:500', ( objIn ) => {
    const errorCode = 500;

    objIn.connection.res.writeHead( errorCode, { 'Content-Type': 'text/html' } );

    if ( objIn.message ){
        objIn.connection.res.end( errorTemplate( {
            message: 'server side error happened... sorry.'
            , explanation: objIn.message
        } ) );
    } else {
        objIn.connection.res.end( errorTemplate( {
            message: 'server side error happened... sorry.'
            , explanation: ''
        } ) );
    }
} );
