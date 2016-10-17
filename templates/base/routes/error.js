'use strict';

const emitter = require('monument').events
    , errorTemplate = require('../templates/error');

emitter.on('error:401', (connection) => {
    const errorCode = 401;

    connection.res.statusCode = errorCode;
    connection.res.send(errorTemplate({
        message: 'You tried to access something you aren\'t allowed to. Punk.'
        , explanation: ''
    }));
});

emitter.on('error:404', (connection) => {
    const errorCode = 404;

    connection.res.statusCode = errorCode;
    connection.res.send(errorTemplate({
        message: 'file not found'
        , explanation: ''
    }));
});

emitter.on('error:500', (objIn) => {
    const errorCode = 500;

    objIn.connection.res.statusCode = errorCode;

    if (objIn.message){
        objIn.connection.res.send(errorTemplate({
            message: 'server side error happened... sorry.'
            , explanation: objIn.message
        }));
    } else {
        objIn.connection.res.send(errorTemplate({
            message: 'server side error happened... sorry.'
            , explanation: ''
        }));
    }
});
