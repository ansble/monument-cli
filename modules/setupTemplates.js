const ora = require('ora'),
      ncp = require('ncp'),
      chalk = require('chalk'),
      pathObj = require('path'),
      types = {
        h: 'handlebars',
        handlebars: 'handlebars',
        d: 'dot',
        dot: 'dot'
      };

module.exports = (type, mainTargetDir) => {
  const spinner = ora({
          text: `Setting up ${types[type]} templates...`,
          spinner: 'star2',
          color: 'yellow'
        }),
        templatePath = pathObj.join(__dirname, '/../templates/');

  spinner.start();

  switch (types[type]) {
    case 'handlebars':
      ncp(pathObj.join(templatePath, 'handlebars/templates'), pathObj.join(mainTargetDir, 'templates'));
      ncp(pathObj.join(templatePath, 'handlebars/routes'), pathObj.join(mainTargetDir, 'routes'));
      break;

    default:
      // do the dot templates here
      ncp(pathObj.join(templatePath, 'dot/templates'), pathObj.join(mainTargetDir, 'templates'));
      ncp(pathObj.join(templatePath, 'dot/routes'), pathObj.join(mainTargetDir, 'routes'));
  }

  spinner.stopAndPersist(chalk.green('✔'));
};
