'use strict';

var config = require('../config');
var gulp = require('gulp');
var size = require('gulp-size');
var concat = require('gulp-concat');
var wrap = require("gulp-wrap");
var uglify = require("gulp-uglify");
var tap = require("gulp-tap");
var debug = require('gulp-debug');
var path = require('path');

gulp.task('templates', function () {
    return gulp.src('app/scripts/**/*.html')
        .pipe(wrap(function (data) {
            data.name = data.file.path.substr(data.file.cwd.length+1);
            return '$templateStore[\'<%= name %>\'] = \'<%= contents %>\';\n'
        }))
        .pipe(uglify())
        .pipe(concat('templates.js'))
        .pipe(debug())
        .pipe(tap(function (file) {
            file.contents = Buffer.concat([
                new Buffer('var $templateStore = {};\nmodule.exports = $templateStore;\n'),
                file.contents
            ]);
        }))
        .pipe(gulp.dest('./app/scripts/'))
        .pipe(size());
});
