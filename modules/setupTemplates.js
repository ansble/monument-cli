const ora = require('ora'),
      ncp = require('ncp'),
      chalk = require('chalk'),
      pathObj = require('path');

module.exports = (type, mainTargetDir) => {
  const spinner = ora({
      text: `Setting up ${type} templates...`,
      spinner: 'star2',
      color: 'yellow'
    }),
    templatePath = pathObj.join(__dirname, '/../templates/');

  spinner.start();

  switch(type) {
    case 'handlebars':
      ncp(pathObj.join(templatePath, 'handlebars/templates'), pathObj.join(mainTargetDir, 'templates'));
      break;

    default:
      // do the dot templates here
      ncp(pathObj.join(templatePath, 'dot/templates'), pathObj.join(mainTargetDir, 'templates'));
  }

  spinner.stopAndPersist(chalk.green('✔'));
};
