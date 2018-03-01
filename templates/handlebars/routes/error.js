'use strict';

const events = require('monument').events;

events.on('error:401', (connection) => {
  const errorCode = 401;

  events.once('template:set:error.hbs', (template) => {
    connection.res.statusCode = errorCode;
    connection.res.send(template({
      message: 'You tried to access something you aren\'t allowed to. Punk.',
      explanation: ''
    }));
  });

  events.emit('template:get', 'error.hbs');
});

events.on('error:404', (connection) => {
  const errorCode = 404;

  events.once('template:set:error.hbs', (template) => {
    connection.res.statusCode = errorCode;
    connection.res.send(template({
      message: 'file not found',
      explanation: ''
    }));
  });

  events.emit('template:get', 'error.hbs');
});

events.on('error:500', (objIn) => {
  const errorCode = 500;

  events.once('template:set:error.hbs', (template) => {
    objIn.connection.res.statusCode = errorCode;

    if (objIn.message){
      objIn.connection.res.send(template({
        message: 'server side error happened... sorry.',
        explanation: objIn.message
      }));
    } else {
      objIn.connection.res.send(template({
        message: 'server side error happened... sorry.',
        explanation: ''
      }));
    }
  });

  events.emit('template:get', 'error.hbs');
});
