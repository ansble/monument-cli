'use strict';

module.exports = (vars) => {

    return `events.on('route:${vars.routePath}:${vars.routeVerb }', (connection) => {
    	'use strict';

    	connection.res.end('route ${vars.routePath } now responding to ${vars.routeVerb} requests');
    });`;
};
