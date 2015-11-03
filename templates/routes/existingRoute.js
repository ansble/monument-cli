'use strict';

module.exports = ( vars ) => {

    return `events.on( 'route:${vars.routePath}:${vars.routeVerb }', ( connection ) => {
    connection.res.send( 'route ${vars.routePath } now responding to ${vars.routeVerb} requests' );
} );`;
};
