'use strict';

const path = require('path')
    , fs = require('fs');

module.exports = (pathToCheckIn) => {
    const pathToCheck = path.join(process.cwd(), pathToCheckIn || '.');

    let check;

    try{
        check = fs.statSync(path.join(pathToCheck, 'package.json'));

        if (require(path.join(pathToCheck, 'package.json')).dependencies.monument) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        // file doesn't exist so this isn't a monument project
        return false;
    }
};
