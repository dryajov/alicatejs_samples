'use strict';

var gulp = require('gulp');

// Dev Server
gulp.task('dev', ['html', 'templates', 'styles', 'vendor', 'browserify', 'images', 'watch']);
