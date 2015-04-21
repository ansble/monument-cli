var events = require('monument').events;

events.on('data:get:<%= dataName %>', function (id) {
  'use strict';

    events.emit('data:set:<%= dataName %>:' + id, []);
});
