var emitter = require('monument').events
	, errorTemplate = require('../templates/error');

emitter.on('error:401', function (connection) {
	'use strict';
	
	connection.res.writeHead(401, {'Content-Type': 'text/html'});
	connection.res.end(errorTemplate({message: 'You tried to access something you aren\'t allowed to. Punk.', explanation: ''}));
});

emitter.on('error:404', function (connection) {
	'use strict';
	
	connection.res.writeHead(404, {'Content-Type': 'text/html'});
	connection.res.end(errorTemplate({message: 'file not found', explanation: ''}));
});

emitter.on('error:500', function (connection, message) {
	'use strict';
	
	connection.res.writeHead(500, {'Content-Type': 'text/html'});
	if(message){
		connection.res.end(errorTemplate({message: 'server side error happened... sorry.', explanation: message}));
	} else {
		connection.res.end(errorTemplate({message: 'server side error happened... sorry.', explanation: ''}));
	}
});