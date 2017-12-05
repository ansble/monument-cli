'use strict';

const events = require('monument').events,
      fetchingStore = {},
      cache = require('node-cached');

events.on('data:get:obj', () => {
  const cached = cache.get('data.obj');

  if (cached === null && !fetchingStore['data.obj']) {
    // get data from async source faked here by process.nextTick
    fetchingStore['data.obj'] = true;

    process.nextTick(() => {
      const result = {
        some: 'data in here'
      };

      fetchingStore['data.obj'] = false;
      events.emit('data:set:obj', result);
      cache.add('data.obj', result, 300000);
    });
  } else if (cached !== null) {
    events.emit('data:set:obj', cached);
  }
});