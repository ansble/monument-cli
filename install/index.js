'use strict';

const dot = require('dot')
    , path = require('path')
    , exists = require('../templates/data/handler');

console.log(exists({dataName: 'testing', routeVerb: 'GET'}));

