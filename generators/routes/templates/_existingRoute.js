events.on('route:<%= routePath %>:<%= routeVerb %>', function (connection) {
	connection.res.end('route <%= routePath %> now responding to <%= routeVerb %> requests');
});