'use strict';

var gulp     = require('gulp'),
    sequence = require('run-sequence'),
    env      = process.env.NODE_ENV || 'development';

require('require-dir')('./tasks');


// var glp_concat = require('gulp-concat'),
// glp_uglify = require('gulp-uglify'),
// glp_changed = require('gulp-changed'),
// glp_sourcemaps = require('gulp-sourcemaps'),


/*************************************
  *      Start the reload task
**************************************/

gulp.task('default', ['clean'], start);

function start (done) {
    gulp.start('reload');
}
