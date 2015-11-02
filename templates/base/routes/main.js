'use strict';

const events = require( 'monument' ).events
    , mainTemplate = require( '../templates/main' )

    , pkg = require( '../package.json' );

events.on( 'route:/:get', ( connection ) => {
    connection.res.end( mainTemplate( { version: pkg.version } ) );
} );
