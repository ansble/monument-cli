'use strict';

module.exports = ( vars ) => {

    return `'use strict';
events.on( 'route:${vars.routePath}:${vars.routeVerb }', ( connection ) => {
    connection.res.end( 'route ${vars.routePath } now responding to ${vars.routeVerb} requests' );
} );`;
};
