'use strict';

module.exports = (vars) => {

    return `'use strict';
    const events = require('monument').events;

    events.on('data:get:${vars.dataName}', (id) => {

        events.emit('data:set:${vars.dataName}:' + id, []);
    });`;
};
