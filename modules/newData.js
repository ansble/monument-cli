'use strict';

const prompt = require('prompt')
    , chalk = require('chalk')
    , monumentCheck = require('./checkForProject')
    , path = require('path')
    , fs = require('fs')

    , collection = require('../templates/data/collection')
    , collectionTest = require('../templates/data/collection.test')
    , object = require('../templates/data/handler')
    , objectTest = require('../templates/data/handler.test');

module.exports = (dataName) => {
    console.log(`Creating a new ${chalk.cyan(dataName)} data handler`);
    prompt.delimiter = ' ';
    prompt.message = chalk.green('>');

    prompt.start();

    const property = {
        name: 'objectCollection'
        , message: 'Is this an object or a collection?'
        , validator: /o[bject]*|c[ollection]?/
        , warning: 'Must respond o (object) or c (collection)'
        , default: 'object'
    };

    prompt.get(property, (err, results) => {
        // copy files and template those in need of it
        // target is path variable above
        const target = path.join(process.cwd(), `/data/${dataName}.js`)
            , testTarget = path.join(process.cwd(), `/data/${dataName}.test.js`)
            , fileName = chalk.cyan(`${dataName}.js`);

        if (monumentCheck()) {
            if (results.objectCollection[0] === 'c') {
                // collection
                fs.writeFile(target, collection(dataName), () => {
                    console.log(`\n\n New data collection ${fileName} has been created!`);
                });

                fs.writeFile(testTarget, collectionTest(dataName), () => {
                    console.log(`\n\n Stub tests for ${fileName} have been created!`);
                });
            } else {
                // object
                fs.writeFile(target, object(dataName), () => {
                    console.log(`\n\n New data handler ${fileName} has been created!`);
                });

                fs.writeFile(testTarget, objectTest(dataName), () => {
                    console.log(`\n\n Stub tests for ${fileName} have been created!`);
                });
            }
        } else {
            console.log('\n\nWait a minute...');
            console.log(`   are you sure this is a ${chalk.cyan('monument')} project folder?`);
            console.log('   Maybe you ran this from the wrong directory?');
        }
    });
};
