'use strict';

module.exports = (dataName) => {

    return `'use strict';

const events = require('monument').events;

events.on('data:get:${dataName}', (id) => {
    if (typeof id === 'undefined') {
        events.emit('data:set:${dataName}', []);
    } else {
        events.emit('data:set:${dataName}:' + id, {});
    }
});`;
};
