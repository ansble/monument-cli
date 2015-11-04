'use strict';

const prompt = require('prompt')
    , chalk = require('chalk')
    , semver = require('semver')
    , fs = require('fs')
    , pathObj = require('path')
    , ncp = require('ncp')
    , stream = require('stream')
    , dot = require('dot')
    , cp = require('child_process');

module.exports = (pathIn) => {
    const path = pathIn || '.';

    fs.stat(path, (err, file) => {
        if (err) {
            console.log(err);
        } else {

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
                            description: 'What is the name of your project?'
                            , type: 'string'
                            // this should change with each major release
                            , default: 'Amstel-Gold Race'
                            , required: true
                        }
                        , version: {
                            description: 'What version shall we start with?'
                            , message: 'Must be valid semver'
                            , default: '1.0.0'
                            , conform: (value) => {
                                  return semver.valid(value);
                              }
                        }
                        , description: {
                            description: 'What will it do?'
                            , default: 'Make the world a better place for everyone'
                            , required: true
                            , type: 'string'
                        }
                    }
                }, (promptErr, resultsIn) => {
                    const templatePath = pathObj.join(__dirname, '/../templates/base/')
                        , templateTransform = () => {
                            const transform = new stream.Transform({ objectMode: true });

                            /* eslint-disable no-underscore-dangle*/
                            transform._transform = function (chunk, enc, done) {
                            /* eslint-enable no-underscore-dangle*/
                                const data = chunk.toString();

                                this.push(dot.template(data)(resultsIn));

                                done();
                            };

                            return transform;
                        }
                        , results = resultsIn

                        , mainFiles = [
                            '.eslintrc'
                            , '.jshintrc'
                            , '.gitignore'
                            , '.editorconfig'
                            , 'routes.json'
                            , 'gulpfile.js'
                            , 'app.js'
                        ]
                        , directories = [
                            'data'
                            , 'public'
                            , 'templates'
                            , 'routes'
                            , 'test_stubs'
                        ]
                        , templateFiles = [
                            '_package.json'
                            , '_readme.md'
                        ];

                    results.packageName = results.name.replace(/\s/, '-');

                    // copy files and template those in need of it
                    // target is path variable above

                    // Copy the non-templated files over
                    mainFiles.forEach((mainFile) => {
                        const filePath = pathObj.join(templatePath, mainFile)
                            , fileTarget = pathObj.join(process.cwd(), mainFile);

                        fs.createReadStream(filePath)
                            .pipe(fs.createWriteStream(fileTarget));
                    });


                    // COPY DIRECTORIES over wholesale
                    directories.forEach((dir) => {
                        const sourceDir = pathObj.join(templatePath, dir)
                            , targetDir = pathObj.join(process.cwd(), dir);

                        ncp(sourceDir, targetDir);
                    });

                    // template the files that need it
                    templateFiles.forEach((template) => {
                        const sourceTemplate = pathObj.join(templatePath, template)
                            , noUnderScoreName = template.replace(/_/, '')
                            , targetTemplate = pathObj.join(process.cwd(), noUnderScoreName);

                        fs.createReadStream(sourceTemplate)
                            .pipe(templateTransform())
                            .pipe(fs.createWriteStream(targetTemplate));
                    });

                    console.log(chalk.cyan('\n\nTemplates copied...'));
                    console.log('  spawning processes to intall dependencies and initialize git repo');
                    console.log(`\nWelcome to ${chalk.cyan('monument')} \n\n`);
                    cp.spawn('npm', [ 'install' ]).stdout.pipe(process.stdout);
                    cp.spawn('git', [ 'init' ]).stdout.pipe(process.stdout);
                });
            }
        }
    });
};
