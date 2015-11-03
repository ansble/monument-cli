'use strict';
module.exports = ( options ) => {

return `    it( 'should respond to route:${options.routePath}:${options.routeVerb}', () => {
        events.emit('route:${options.routePath}:${options.routeVerb}', fakeConnection);

        assert.strictEqual( fakeConnection.out().response, 'route ${options.routePath } now responding to ${options.routeVerb} requests' );
    } );`;
}
