'use strict';
const events = require('monument').events,
      fetchingStore = {},
      cache = require('node-cached'),

      stubData = [
        {
          id: 123,
          some: 'data in here'
        },
        {
          id: 1,
          some: 'data in here'
        }
      ],

      notInProgress = (cached) => {
        return cached === null && !fetchingStore['data.coll'];
      },

      returnCollection = (cached) => {
        if (notInProgress(cached)) {
          // get data from async source faked here by process.nextTick
          fetchingStore['data.coll'] = true;

          process.nextTick(() => {
            fetchingStore['data.coll'] = false;
            events.emit('data:set:coll', stubData);
            cache.add('data.coll', stubData, 300000);
          });
        } else if (cached !== null) {
          events.emit('data:set:coll', cached);
        }
      },

      returnItem = (cached, id) => {
        if (notInProgress(cached)) {
          // get data from async source faked here by process.nextTick
          fetchingStore['data.coll'] = true;

          process.nextTick(() => {
            fetchingStore['data.coll'] = false;
            events.emit(`data:set:coll:${id}`, stubData.find((item) => {
              return item.id === id;
            }));
            cache.add('data.coll', stubData, 300000);
          });
        } else if (cached !== null) {
          events.emit(`data:set:coll:${id}`, cached.find((item) => {
            return item.id === id;
          }));
        }
      };


events.on('data:get:coll', (id) => {
  const cached = cache.get('data.coll');

  if (typeof id === 'undefined') {
    returnCollection(cached);
  } else {
    returnItem(cached, id);
  }
});