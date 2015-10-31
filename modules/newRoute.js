'use strict';

const chalk = require('chalk')
    , monumentCheck = require('./checkForProject')
    , path = require('path')
    , fs = require('fs')

    , existingRoute = require('../templates/routes/existingRoute')
    , routeTemplate = require('../templates/routes/route');

module.exports = () => {
    let routes
        , routeReadHolder;

    console.log('Updating your applications route handlers');

    if (monumentCheck()) {
        try {
            fs.statSync(path.join(process.cwd(), 'routes.json'));
            routes = require(path.join(process.cwd(), 'routes.json'));

            Object.keys(routes).forEach(function (route) {
                var fileName = route.split('/')
                  , localRoute = route;

                if(fileName[0] !== ''){
                    console.log(chalk.yellow('You have a route that doesn\'t begin with "/"... you should fix that'));
                    fileName = fileName[0];
                    localRoute = '/' + route;
                } else {
                    fileName = fileName[1];
                }

                if(route === '/' || route.match(/^\/:/)){
                    fileName = 'main';
                }

                try {
                    fs.statSync(path.join(process.cwd() + '/routes/' + fileName + '.js'));

                    routeReadHolder = fs.readFileSync(process.cwd() + '/routes/' + fileName + '.js', 'utf-8');

                    //check for all the verbs...
                    routes[route].forEach(function (verb) {
                        var regex = new RegExp('route:' + localRoute + ':' + verb.toLowerCase());

                        if(!routeReadHolder.match(regex)){
                            //the route does not yet exist... stub it out

                            routeReadHolder += '\r\n\r\n' + existingRoute({routePath: localRoute, routeVerb: verb});

                            fs.writeFileSync(path.join(process.cwd(), '/routes/' + fileName + '.js'), routeReadHolder);
                        }
                    });
                } catch (err) {
                    routeReadHolder = routeTemplate();

                    routes[route].forEach(function (verb) {
                        routeReadHolder += '\r\n\r\n' + existingRoute({routePath: localRoute, routeVerb: verb});
                    });

                    fs.writeFileSync(path.join(process.cwd(), '/routes/' + fileName + '.js'), routeReadHolder);
                }
            });
        } catch (err) {
            console.log(err);
            console.log('\n\nCouldn\'t find a routes.json to base your application on...');
        }

    } else {
        console.log('\n\nWait a minute... this doesn\'t look like a ' + chalk.cyan('monument') + ' project folder...');
        console.log('   Maybe you ran this from the wrong directory?');
    }
};
