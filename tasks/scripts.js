'use strict';

var gulp        = require('gulp'),
    glp_plumber = require('gulp-plumber'),
    glp_jshint  = require('gulp-jshint'),
    jsstyle     = require('jshint-stylish'),
    es6ify      = require('es6ify'),
    source      = require('vinyl-source-stream'),
    streamify   = require('streamify'),
    watchify    = require('watchify'),
    browserify  = require('browserify'),
    config      = require('../build.config.js');


function handleError(err) {
    console.error(err.toString());
    process.stdout.write('\x07');
    this.emit('end');
}

/*************************************
  *           Js Tasks
**************************************/

gulp.task('jsHint', jsHint);
gulp.task('js', ['jsHint'], js);
gulp.task('jsCompile', jsCompile);

function jsHint () {
    return gulp.src(config.files.js.src, config.files.examples.js.src)
        .pipe(glp_jshint())
        .pipe(glp_jshint.reporter(jsstyle));
}

function js () {
    var src = '../src/soundscape/index.js';

    return browserify({ standalone: 'SoundscapeProvider', debug: true })
        .transform(es6ify)
        .on('error', handleError)
        .require(require.resolve(src), {entry: true})
        .bundle()
        .pipe(source('soundscape.js'))
        .pipe(gulp.dest(config.files.examples.js.dest));
}

function jsCompile () {
    var dest = config.dist
    return js()
        .pipe(glp_uglify())
        .pipe(gulp.dest(dest));
}

/*************************************
  *        Js Examples Task
**************************************/

gulp.task('jsExamples', jsExamples);

function jsExamples () {
    var src = '../src/examples/app.js';

    return browserify({ debug:true })
        .transform(es6ify)
        .on('error', handleError)
        // .add('./bower_components/traceur-runtime/traceur-runtime.js')
        .require(require.resolve(src), {entry: true})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(config.files.examples.js.dest));

    // return gulp.src(config.files.examples.js.src)
    //     .pipe(glp_plumber())
    //     .pipe(glp_jshint())
    //     .pipe(glp_jshint.reporter(jsstyle))
    //     .pipe(gulp.dest(config.files.examples.js.dest));
}
