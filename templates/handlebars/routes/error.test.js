'use strict';

const test = require('ava'),
      events = require('monument').events,
      fakeConnection = require('../test_stubs/connectionStub'),

      response401 = `<!doctype html>
<html lang="en">
    <head>
    </head>
    <body>
        <h1>You tried to access something you aren&#x27;t allowed to. Punk.</h1>
        <h2></h2>
    </body>
</html>
`,
      response404 = `<!doctype html>
<html lang="en">
    <head>
    </head>
    <body>
        <h1>file not found</h1>
        <h2></h2>
    </body>
</html>
`,
      response500Generic = `<!doctype html>
<html lang="en">
    <head>
    </head>
    <body>
        <h1>server side error happened... sorry.</h1>
        <h2></h2>
    </body>
</html>
`;

// Initialize the code to be tested
require('./error');
require('../templates');

test.beforeEach(() => {
  fakeConnection.reset();
  fakeConnection.res.statusCode = 200;
});

test.cb('should respond to error:401 with an unauthorized message', (t) => {
  const statusCode = 401;

  fakeConnection.done(() => {
    const result = fakeConnection.out();

    t.is(typeof result.headers, 'object');
    t.is(fakeConnection.res.statusCode, statusCode);
    t.is(result.response, response401);
    t.end();
  });

  events.emit('error:401', fakeConnection);
});

test.cb('should respond to error:404 with a missing file message', (t) => {
  const statusCode = 404;

  fakeConnection.done(() => {
    const result = fakeConnection.out();

    t.is(typeof result.headers, 'object');
    t.is(fakeConnection.res.statusCode, statusCode);
    t.is(result.response, response404);
    t.end();
  });

  events.emit('error:404', fakeConnection);
});

test.cb('should respond to error:500 with a server error', (t) => {
  const statusCode = 500;

  fakeConnection.done(() => {
    const result = fakeConnection.out();

    t.is(typeof result.headers, 'object');
    t.is(fakeConnection.res.statusCode, statusCode);
    t.is(result.response, response500Generic);
    t.end();
  });

  events.emit('error:500', {
    connection: fakeConnection
  });

});

test.cb('should respond to error:500 with a server error', (t) => {
  const message = 'This was a bad idea',
        statusCode = 500;

  fakeConnection.done(() => {
    const result = fakeConnection.out();

    t.is(typeof result.headers, 'object');
    t.is(fakeConnection.res.statusCode, statusCode);
    t.true(result.response.includes(message));
    t.end();
  });

  events.emit('error:500', {
    connection: fakeConnection,
    message: message
  });
});
