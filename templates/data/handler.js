'use strict';

module.exports = ( dataName ) => {
    return `'use strict';

const events = require( 'monument' ).events;

events.on( 'data:get:${dataName}', () => {
    events.emit( 'data:set:${dataName}', {} );
} );`;
};
