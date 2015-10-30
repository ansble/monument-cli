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
            if (file.isDirectory()) {
                if (fs.readdirSync(path).length !== 0) {
                    console.log('Oh noes! That\'s not an empty directory!');

                    return;
                }

                console.log('Creating a new' + chalk.cyan(' monument ') + 'project @ ' + path);

                prompt.delimiter = ' ';
                prompt.message = chalk.green('>');

                prompt.start();

                prompt.get({
                    properties: {
                        name: {
                            description: 'What is the name of your project?'
                            , type: 'string'
                            , default: 'Amstel-Gold Race' //this should change with each major release
                            , required: true
                        }
                        , version: {
                            description: 'What version shall we start with?'
                            , message: 'Must be valid semver'
                            , default: '1.0.0'
                            , conform : (value) => {
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
                }, (err, results) => {
                    const templatePath = __dirname + '/../templates/base/'
                        , templateTransform = () => {
                            const transform = new stream.Transform({objectMode: true});

                            transform._transform = function (chunk, enc, done) {
                                var data = chunk.toString();

                                this.push(dot.template(data)(results));

                                done();
                            };

                            return transform;
                        };

                    // let npmInstall;

                    results.packageName = results.name.replace(/\s/, '-');

                    //copy files and template those in need of it
                    //target is path variable above

                    //Copy the non-templated files over
                    fs.createReadStream(pathObj.join(templatePath, 'jshintrc'))
                        .pipe(fs.createWriteStream(pathObj.join(process.cwd(), '.jshintrc')));
                    fs.createReadStream(pathObj.join(templatePath, 'gitignore'))
                        .pipe(fs.createWriteStream(pathObj.join(process.cwd(), '.gitignore')));
                    fs.createReadStream(pathObj.join(templatePath, 'editorconfig'))
                        .pipe(fs.createWriteStream(pathObj.join(process.cwd(), '.editorconfig')));
                    fs.createReadStream(pathObj.join(templatePath, 'routes.json'))
                        .pipe(fs.createWriteStream(pathObj.join(process.cwd(), 'routes.json')));
                    fs.createReadStream(pathObj.join(templatePath, 'gulpfile.js'))
                        .pipe(fs.createWriteStream(pathObj.join(process.cwd(), 'gulpfile.js')));
                    fs.createReadStream(pathObj.join(templatePath, 'app.js'))
                        .pipe(fs.createWriteStream(pathObj.join(process.cwd(), 'app.js')));


                    //COPY DIRECTORIES over wholesale
                    ncp(pathObj.join(templatePath, 'data'), pathObj.join(process.cwd(), 'data'));
                    ncp(pathObj.join(templatePath, 'public'), pathObj.join(process.cwd(), 'public'));
                    ncp(pathObj.join(templatePath, 'templates'), pathObj.join(process.cwd(), 'templates'));
                    ncp(pathObj.join(templatePath, 'routes'), pathObj.join(process.cwd(), 'routes'));


                    //template the files that need it
                    fs.createReadStream(pathObj.join(templatePath, '_package.json'))
                        .pipe(templateTransform())
                        .pipe(fs.createWriteStream(pathObj.join(process.cwd(), 'package.json')));

                    fs.createReadStream(pathObj.join(templatePath, '_readme.md'))
                        .pipe(templateTransform())
                        .pipe(fs.createWriteStream(pathObj.join(process.cwd(), 'readme.md')));

                    console.log(chalk.cyan('\n\nTemplates copied... spawning processes to intall dependencies and initialize git repo'));
                    console.log('\nWelcome to ' + chalk.cyan('monument\n\n'));
                    cp.spawn('npm', ['install']).stdout.pipe(process.stdout);
                    cp.spawn('git', ['init']).stdout.pipe(process.stdout);
                });
            }
        }
    });
};
