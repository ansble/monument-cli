'use strict';

const gulp = require('gulp')
    , mocha = require('gulp-mocha')
    , eslint = require('gulp-eslint');

gulp.task('default', [ 'test' ]);

gulp.task('lint', () => {
    return gulp.src([ '**/*.js', '!node_modules/' ])
        .pipe(eslint('./.eslintrc'))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', [ 'lint' ], () => {

    return gulp.src([ '**/**.test.js', '!node_modules/**/*' ], { read: false })
            .pipe(mocha({ reporter: 'spec' }));
});
