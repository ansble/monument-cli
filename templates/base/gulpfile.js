'use strict';

const gulp = require('gulp')
    , mocha = require('gulp-mocha')
    , eslint = require('gulp-eslint')
    , path = require('path')
    , dot = require('dot');

gulp.task('default', [ 'test' ]);

gulp.task('lint', () => {
    return gulp.src([ '**/*.js', '!node_modules/', '!templates/*.js' ])
        .pipe(eslint('./.eslintrc'))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', [ 'lint' ], () => {
    dot.process({ path: path.join(process.cwd(), './templates') });

    return gulp.src([ '**/**.test.js', '!node_modules/**/*' ], { read: false })
            .pipe(mocha({ reporter: 'spec' }));
});
