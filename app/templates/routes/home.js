var events = require('monumentjs').events;

events.on('route:/:get', function (connection) {
	connection.res.end('it is working');
});