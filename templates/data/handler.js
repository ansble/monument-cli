'use strict';

module.exports = (dataName) => {
    return `'use strict';

const events = require('monument').events
    , fetchingStore = {}
    , cache = require('node-cached');

events.on('data:get:${dataName}', () => {
    const cached = cache.get('data.${dataName}');

    if (cached === null && !fetchingStore['data.${dataName}'])) {
        // get data from async source faked here by process.nextTick
        fetchingStore['data.${dataName}'] = true;

        process.nextTick(() => {
            const result = {
                some: 'data in here'
            };

            fetchingStore['data.${dataName}'] = false;
            events.emit('data:set:${dataName}', result);
            cache.add('data.${dataName}', result, 300000);
        });
    } else if (cached !== null) {
        events.emit('data:set:${dataName}', cached);
    }
});`;
};
