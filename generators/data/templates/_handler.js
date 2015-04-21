var events = require('monument').events;

events.on('data:get:<%= dataName %>', function () {
  'use strict';

    events.emit('data:set:<%= dataName %>', {});
});
