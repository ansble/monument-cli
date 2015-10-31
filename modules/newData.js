'use strict';

const prompt = require('prompt')
    , chalk = require('chalk')
    , monumentCheck = require('./checkForProject')
    , path = require('path')
    , fs = require('fs')

    , collection = require('../templates/data/collection')
    , object = require('../templates/data/handler');

module.exports = (dataName) => {
    console.log('Creating a new ' + chalk.cyan(dataName) + ' data handler');
    prompt.delimiter = ' ';
    prompt.message = chalk.green('>');

    prompt.start();

    const property = {
        name: 'objectCollection',
        message: 'Is this an object or a collection?',
        validator: /o[bject]*|c[ollection]?/,
        warning: 'Must respond o (object) or c (collection)',
        default: 'object'
    };
    prompt.get(property, (err, results) => {
        //copy files and template those in need of it
        //target is path variable above
        if (monumentCheck()) {
            if(results.objectCollection[0] === 'c') {
                //collection
                fs.writeFile(path.join(process.cwd(), '/data/' + dataName + '.js'), collection(dataName), () => {
                    console.log('\n\n New data collection ' + chalk.cyan(dataName + '.js') + ' has been created!');
                });
            } else {
                //object
                fs.writeFile(path.join(process.cwd(), '/data/' + dataName + '.js'), object(dataName), () => {
                    console.log('\n\n New data handler ' + chalk.cyan(dataName + '.js') + ' has been created!');
                });
            }
        } else {
            console.log('\n\nWait a minute... this doesn\'t look like a ' + chalk.cyan('monument') + ' project folder...');
            console.log('   Maybe you ran this from the wrong directory?');
        }
    });
};
