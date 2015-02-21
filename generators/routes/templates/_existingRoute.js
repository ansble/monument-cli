events.on('route:<%= routePath %>:<%= routeVerb %>', function (connection) {
	'use strict';
	
	connection.res.end('route <%= routePath %> now responding to <%= routeVerb %> requests');
});