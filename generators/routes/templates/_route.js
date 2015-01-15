var events = require('monumentjs').events
	, mainTemplate = require('../templates/main')
	
	, pkg = require('../package.json');

events.on('route:<%= routePath %>:<%= routeVerb %>', function (connection) {
	connection.res.end(mainTemplate({version: pkg.version}));
});