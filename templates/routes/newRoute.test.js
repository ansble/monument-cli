'use strict';
module.exports = (options) => {

  return `test.cb('should respond to route:${options.routePath}:${options.routeVerb}', (t) => {
  fakeConnection.done(() => {
    t.is(fakeConnection.out().response, 'route ${options.routePath } now responding to ${options.routeVerb} requests');
    t.end();
  });

  events.emit('route:${options.routePath}:${options.routeVerb}', fakeConnection);
});`;
};
