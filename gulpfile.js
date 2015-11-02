'use strict';

const gulp = require( 'gulp' )
    , mocha = require( 'gulp-mocha' )
    , minimist = require( 'minimist' )
    , cp = require( 'child_process' )
    , chalk = require( 'chalk' )
    , fs = require( 'fs' )

    , pkg = require( './package.json' )

    , knownOptions = {
        string: 'type'
        , default: { type: 'patch' }
    }

    , incrementVersion = ( version, type ) => {
        const versionArr = version.split( '.' );

        if ( type === 'major' ){
            versionArr[0] = parseInt( versionArr[0], 10 ) + 1;
        } else if ( type === 'minor' ) {
            versionArr[1] = parseInt( versionArr[1], 10 ) + 1;
        } else {
            versionArr[2] = parseInt( versionArr[2], 10 ) + 1;
        }

        return versionArr.join( '.' );
    }

    , options = minimist( process.argv.slice( 2 ), knownOptions );

gulp.task( 'default', Function.prototype );

gulp.task( 'test', () => {

    return gulp.src( [ '**/**.test.js', '!node_modules/**/*' ], { read: false } )
            .pipe( mocha( { reporter: 'spec' } ) );
} );

gulp.task( 'release', [ 'test' ], () => {
    const newVersion = incrementVersion( pkg.version, options.type );

    // this is the task to automat most of the release stuff... because it is lame and boring
    console.log( `\n\nPreparing for a ${chalk.bgGreen.bold( options.type )} release...\n\n` );


    cp.exec( 'git log `git describe --tags --abbrev=0`..HEAD --pretty=format:"  - %s"', ( err, stdout ) => {
        const history = fs.readFileSync( './history.md' )
            , versionHeader = `### - ${newVersion} * ${new Date().toLocaleString()} *\n\n`;

        console.log( 'Updating the history.md file' );

        fs.writeFile( './history.md', `${versionHeader} ${stdout} \n\n\n ${history}` );

        cp.exec( 'git log --all --format="%aN <%aE>" | sort -u', ( err, stdout ) => {
            // write out the Authors file with all contributors
            console.log( 'Updating the AUTHORS file' );

            fs.writeFile( './AUTHORS', stdout );

            cp.exec( 'git add .', () => {
                cp.exec( 'git commit -m "preparing for release of v' + newVersion + '"', () => {
                    console.log( 'commited the automated updates' );
                    // run npm version
                    cp.exec( 'npm version ' + options.type, () => {
                        console.log( 'npm version to rev for release' );
                        cp.exec( 'npm publish', () => {
                            console.log( 'pushing to origin' );

                            cp.exec( 'git push origin master', () => {
                                cp.exec( 'git push origin v' + newVersion, ( err ) => {
                                    if ( err ){
                                        console.log( err );
                                    }
                                    console.log( chalk.green( 'DONE! Congrats on the Release!' ) );
                                } );
                            } );
                        } );
                    } );

                } );
            } );
        } );
    } );
} );
