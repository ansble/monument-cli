'use strict';

module.exports = (dataName) => {

  return `'use strict';
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
        return cached === null && !fetchingStore['data.${dataName}'];
      },

      returnCollection = (cached) => {
        if (notInProgress(cached)) {
          // get data from async source faked here by process.nextTick
          fetchingStore['data.${dataName}'] = true;

          process.nextTick(() => {
            fetchingStore['data.${dataName}'] = false;
            events.emit('data:set:${dataName}', stubData);
            cache.add('data.${dataName}', stubData, 300000);
          });
        } else if (cached !== null) {
          events.emit('data:set:${dataName}', cached);
        }
      },

      returnItem = (cached, id) => {
        if (notInProgress(cached)) {
          // get data from async source faked here by process.nextTick
          fetchingStore['data.${dataName}'] = true;

          process.nextTick(() => {
            fetchingStore['data.${dataName}'] = false;
            events.emit(\`data:set:${dataName}:\${id}\`, stubData.find((item) => {
              return item.id === id;
            }));
            cache.add('data.${dataName}', stubData, 300000);
          });
        } else if (cached !== null) {
          events.emit(\`data:set:${dataName}:\${id}\`, cached.find((item) => {
            return item.id === id;
          }));
        }
      };


events.on('data:get:${dataName}', (id) => {
  const cached = cache.get('data.${dataName}');

  if (typeof id === 'undefined') {
    returnCollection(cached);
  } else {
    returnItem(cached, id);
  }
});`;
};
