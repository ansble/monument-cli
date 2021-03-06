'use strict';

const prompt = require('prompt'),
      chalk = require('chalk'),
      semver = require('semver'),
      fs = require('fs'),
      pathObj = require('path'),
      ncp = require('ncp'),
      stream = require('stream'),
      dot = require('dot'),
      cp = require('child_process'),
      ora = require('ora'),
      setupTemplates = require('./setupTemplates'),
      pkg = require('../package.json');

dot.templateSettings.strip = false;

module.exports = (pathIn) => {
  const path = pathIn || '.';

  fs.stat(path, (err, fileIn) => {
    let file = fileIn;

    if (err) {
      if (err.code === 'ENOENT') {
        // there is no directory where you requested... create it
        fs.mkdirSync(pathObj.join(process.cwd(), path));
        file = fs.statSync(path);
      } else {
        console.log(err);
        return;
      }
    }

    if (file.isDirectory() && fs.readdirSync(path).length !== 0){
      console.log('Oh noes! That\'s not an empty directory!');

      return;
    } else if (file.isDirectory()) {
      console.log(`Creating a new ${chalk.cyan(' monument ')} project @ ${path}`);

      prompt.delimiter = ' ';
      prompt.message = chalk.green('>');

      prompt.start();

      prompt.get({
        properties: {
          name: {
            description: 'What is the name of your project?',
            type: 'string',
            // this should change with each major release
            default: 'Grand Prix Cycliste de Montreal',
            required: true
          },
          version: {
            description: 'What version shall we start with?',
            message: 'Must be valid semver',
            default: '1.0.0',
            conform: (value) => {
              return semver.valid(value);
            }
          },
          description: {
            description: 'What will it do?',
            default: 'Make the world a better place for everyone',
            required: true,
            type: 'string'
          },
          templates: {
            description: 'What template engine will you use? [(d)ot/(h)andlebars]',
            default: 'dot',
            required: true,
            type: 'string',
            before: (v) => {
              return v;
            },
            conform: (v) => {
              return [ 'd', 'h', 'dot', 'handlebars' ].includes(v);
            }
          }
        }
      }, (promptErr, resultsIn) => {
        let gitFlag = false,
            npmFlag = false,
            endFlag = false;

        const templatePath = pathObj.join(__dirname, '/../templates/base/'),
              templateTransform = () => {
                const transform = new stream.Transform({ objectMode: true });

                if (resultsIn.templates === 'd' || resultsIn.templates === 'dot') {
                  resultsIn.templates = { name: 'dot', version: '1.1.2' };
                }

                if (resultsIn.templates === 'h' || resultsIn.templates === 'handlebars') {
                  resultsIn.templates = { name: 'handlebars', version: '4.0.11' };
                }

                /* eslint-disable no-underscore-dangle*/
                transform._transform = function (chunk, enc, done) {
                /* eslint-enable no-underscore-dangle*/
                  const data = chunk.toString();

                  resultsIn.templateVersion = resultsIn.templates === 'dot' ? '1.1.2' : '4.0.11';
                  resultsIn.monumentVersion = pkg.devDependencies.monument;

                  this.push(dot.template(data)(resultsIn));

                  done();
                };

                return transform;
              },
              results = resultsIn,

              mainFiles = [
                'routes.json',
                'app.js',
                'Dockerfile'
              ],

              dotFiles = [
                'eslintrc',
                'eslintignore',
                'gitignore',
                'editorconfig',
                'dockerignore'
              ],

              directories = [
                'data',
                'public',
                'test_stubs',
                'bin'
              ],

              templateFiles = [
                '_package.json',
                '_readme.md'
              ],

              mainTargetDir = pathObj.join(process.cwd(), path),
              templateSpinner = ora({
                text: 'Preparing templates',
                spinner: 'star2',
                color: 'yellow'
              }),
              processSpinner = ora({
                text: 'Installing dependencies',
                spinner: 'star2',
                color: 'yellow'
              }),
              gitSpinner = ora({
                text: 'Initializing git repo',
                spinner: 'star2',
                color: 'yellow'
              }),
              doneMessage = () => {
                if (npmFlag && gitFlag && !endFlag) {
                  endFlag = true;
                  console.log(`\nWelcome to ${chalk.cyan('monument')} \n\n`);
                }
              };

        results.packageName = results.name.replace(/\s/g, '-');

        // copy files and template those in need of it
        // target is path variable above
        templateSpinner.start();
        // Copy the non-templated files over
        mainFiles.forEach((mainFile) => {
          const filePath = pathObj.join(templatePath, mainFile),
                fileTarget = pathObj.join(mainTargetDir, mainFile);

          fs.createReadStream(filePath)
            .pipe(fs.createWriteStream(fileTarget));
        });

        // Copy the non-templated files over
        dotFiles.forEach((dotFile) => {
          const filePath = pathObj.join(templatePath, dotFile),
                fileTarget = pathObj.join(mainTargetDir, `.${dotFile}`);

          fs.createReadStream(filePath)
            .pipe(fs.createWriteStream(fileTarget));
        });


        // COPY DIRECTORIES over wholesale
        directories.forEach((dir) => {
          const sourceDir = pathObj.join(templatePath, dir),
                targetDir = pathObj.join(mainTargetDir, dir);

          ncp(sourceDir, targetDir);
        });

        // SETUP THE TEMPLATE DIRECTORY
        setupTemplates(results.templates, mainTargetDir);

        // template the files that need it
        templateFiles.forEach((template) => {
          const sourceTemplate = pathObj.join(templatePath, template),
                noUnderScoreName = template.replace(/_/, ''),
                targetTemplate = pathObj.join(mainTargetDir, noUnderScoreName);

          fs.createReadStream(sourceTemplate)
            .pipe(templateTransform())
            .pipe(fs.createWriteStream(targetTemplate));
        });

        templateSpinner.stopAndPersist({ symbol: chalk.green('✔') });
        processSpinner.start();
        gitSpinner.start();

        cp.spawn('npm', [ 'install' ], { cwd: mainTargetDir }).on('close', (code) => {
          npmFlag = true;

          if (code === 0) {
            processSpinner.stopAndPersist({ symbol: chalk.green('✔') });
          } else {
            processSpinner.stopAndPersist({ symbol: chalk.red('✖') });
          }

          doneMessage();
        });

        cp.spawn('git', [ 'init' ], { cwd: mainTargetDir }).on('close', (code) => {
          gitFlag = true;

          if (code === 0) {
            gitSpinner.stopAndPersist({ symbol: chalk.green('✔') });
          } else {
            gitSpinner.stopAndPersist({ symbol: chalk.red('✖') });
          }

          doneMessage();
        });
      });
    }
  });
};
