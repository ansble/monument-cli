var gulp = require('gulp')

    , mocha = require('gulp-mocha')

    //for restarting node on server file changes...
    , spawn = require('child_process').spawn
    , node;

gulp.task('default', function(){

});

gulp.task('server', function() {
    'use strict';

    if (node) {
        node.kill();
    }

    node = spawn('node', ['app.js'], {stdio: 'inherit'});

    node.on('close', function (code) {
        if (code === 8) {
          console.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('test', function (){
    'use strict';

    return gulp.src(['**/**.test.js', '!node_modules/**/*'], {read: false})
            .pipe(mocha({reporter: 'spec'}));
});

gulp.task('dev', ['server'], function () {
    'use strict';

    gulp.watch([
            '!templates/*.js'
            , 'templates/*.jst'
            , 'templates/*.def'
            , 'templates/*.dot'
            , '!public/**/*.js'
            , '!node_modules/**/*.js'
            , '**/*.js'
        ], ['server']);
});

process.on('exit', function() {
    'use strict';

    if (node) {
        node.kill();
    }
});