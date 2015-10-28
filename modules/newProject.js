'use strict';

const prompt = require('prompt')
    , chalk = require('chalk')
    , semver = require('semver');

module.exports = (path) => {
    console.log('Creating a new' + chalk.bold(' monument ') + 'project @ ' + path);
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
        //copy files and template those in need of it
        //target is path variable above
        console.log(results);
    });
};
