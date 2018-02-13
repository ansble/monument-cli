const events = require('monument').events,
      fs = require('fs'),
      path = require('path'),
      handlebars = require('handlebars'),

      templates = {};

// load in all the handlebars templates
try {
  fs.readdirSync('templates').forEach((file) => {
    const filePath = path.join('templates', file);

    if (/\.hbs$/.test(file)) {
      templates[file] = handlebars.compile(fs.readFileSync(filePath).toString());
    }
  });
} catch (err) {
  throw new Error(err);
}

events.on('template:get', (file) => {
  events.emit(`template:set:${file}`, (obj) => {
    return templates[file](obj);
  });
});
