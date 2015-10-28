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

emitter.on('error:500', function (objIn) {
	'use strict';
	
	objIn.connection.res.writeHead(500, {'Content-Type': 'text/html'});
	if(objIn.message){
		objIn.connection.res.end(errorTemplate({message: 'server side error happened... sorry.', explanation: objIn.message}));
	} else {
		objIn.connection.res.end(errorTemplate({message: 'server side error happened... sorry.', explanation: ''}));
	}
});