'use strict';

const chalk = require('chalk')
    , monumentCheck = require('./checkForProject')
    , path = require('path')
    , fs = require('fs')

    , existingRoute = require('../templates/routes/existingRoute')
    , routeTemplate = require('../templates/routes/route')
    , routeTest = require('../templates/routes/newRoute.test')
    , routeTestHeader = require('../templates/routes/newRouteHeader.test')
    , routeTestEOF = require('../templates/routes/newRouteEOF.test');

module.exports = () => {
    let routes
        , routeReadHolder
        , routeTestHolder;

    console.log('Updating your applications route handlers');

    if (monumentCheck()) {
        try {
            fs.statSync(path.join(process.cwd(), 'routes.json'));
            routes = require(path.join(process.cwd(), 'routes.json'));

            Object.keys(routes).forEach((route) => {
                const fileName = route.split('/')
                  , localRoute = route;

                let finalFileName = fileName
                    , targetTestPath
                    , targetPath
                    , chalkedFileName;

                if (finalFileName[0] === '') {
                    finalFileName = finalFileName[1];
                } else {
                    console.log(chalk.yellow('You have a route that doesn\'t begin with "/"... you should fix that'));
                    finalFileName = finalFileName[0];
                    localRoute = `/${route}`;
                }

                if (route === '/' || route.match(/^\/:/)){
                    finalFileName = 'main';
                }

                targetPath = path.join(process.cwd(), `/routes/${finalFileName}.js`);
                targetTestPath = path.join(process.cwd(), `/routes/${finalFileName}.test.js`);
                chalkedFileName = chalk.cyan(`/routes/${finalFileName}.js`);

                try {
                    fs.statSync(targetPath);

                    routeReadHolder = fs.readFileSync(targetPath, 'utf-8');

                    // check for all the verbs...
                    routes[route].forEach((verb) => {
                        const regex = new RegExp(`route:${localRoute}:${verb.toLowerCase()}`)
                            , chalkedVerb = chalk.green(verb)
                            , chalkedRoute = chalk.green(localRoute);

                        if (!routeReadHolder.match(regex)){
                            // the route does not yet exist... stub it out

                            routeReadHolder += `\r\n\r\n${existingRoute({
                                routePath: localRoute
                                , routeVerb: verb
                            })}`;

                            fs.writeFileSync(targetPath, routeReadHolder);
                            console.log(`${chalkedFileName} updated with the ${chalkedRoute} handler for ${chalkedVerb} requests`);
                        }
                    });
                } catch (err) {
                    routeReadHolder = routeTemplate();
                    routeTestHolder = routeTestHeader({ fileName: localRoute });

                    routes[route].forEach((verb) => {
                        routeReadHolder += `\r\n\r\n${existingRoute({
                            routePath: localRoute
                            , routeVerb: verb
                        })}`;

                        routeTestHolder += `\r\n\r\n${routeTest({
                            routePath: localRoute
                            , routeVerb: verb
                        })}`;
                    });

                    routeTestHolder += routeTestEOF();

                    fs.writeFileSync(targetPath, routeReadHolder);
                    fs.writeFileSync(targetTestPath, routeTestHolder);

                    console.log(`${chalkedFileName} created`);
                }
            });
        } catch (err) {
            console.log(err);
            console.log('\n\nCouldn\'t find a routes.json to base your application on...');
        }

    } else {
        console.log('\n\nWait a minute...');
        console.log(`   are you sure this is a ${chalk.cyan('monument')} project folder?`);
        console.log('   Maybe you ran this from the wrong directory?');
    }
};
