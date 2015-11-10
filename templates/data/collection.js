'use strict';

module.exports = (dataName) => {

    return `'use strict';

const events = require('monument').events
    , fetchingStore = {}
    , cache = require('node-cached');

events.on('data:get:${dataName}', (id) => {
    const cached = cache.get('data.${dataName}');

    if (typeof id === 'undefined') {
        if (cached === null && !fetchingStore['data.${dataName}'])) {
            // get data from async source faked here by process.nextTick
            fetchingStore['data.${dataName}'] = true;

            process.nextTick(() => {
                const result = [{
                    some: 'data in here'
                }];

                fetchingStore['data.${dataName}'] = false;
                events.emit('data:set:${dataName}', result);
                cache.add('data.${dataName}', result, 300000);
            });
        } else if (cached !== null) {
            events.emit('data:set:${dataName}', cached);
        }
    } else {
        if (cached === null && !fetchingStore['data.${dataName}'])) {
            // get data from async source faked here by process.nextTick
            fetchingStore['data.${dataName}'] = true;

            process.nextTick(() => {
                const result = [{
                    id: 1
                    , some: 'data in here'
                }];

                fetchingStore['data.${dataName}'] = false;
                events.emit('data:set:${dataName}:' + id, cached.find((item) => {
                    return item.id === id;
                }));
                cache.add('data.${dataName}', result, 300000);
            });
        } else if (cached !== null) {
            events.emit('data:set:${dataName}', cached.find((item) => {
                return item.id === id;
            }));
        }
    }
});`;
};
