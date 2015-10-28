'use strict';

module.exports = (vars) => {
    return `'use strict';

    const events = require('monument').events;

    events.on('data:get:${vars.dataName}', function () {
        events.emit('data:set:${vars.dataName}', {});
    });`;
};
