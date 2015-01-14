var events = require('monumentjs').events
	, mainTemplate = reqiure('../templates/main')
	
	, pkg = require('../package.json');

events.on('route:/:get', function (connection) {
	connection.res.end(mainTemplate({version: pkg.version}));
});