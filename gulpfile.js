var env  = process.env.NODE_ENV || 'development';

var http = require('http'),
      fs = require('fs'),
    path = require('path'),
 connect = require('connect'),
  morgan = require('morgan'),
  static = require('serve-static'),
      es = require('event-stream'),
 jsstyle = require('jshint-stylish'),
    beep = require('beepbeep'),
sequence = require('run-sequence'),
     url = require('url'),
     del = require('del'),
   spawn = require('child_process').spawn,
   proxy = require('proxy-middleware'),
  es6ify = require('es6ify'),
  source = require('vinyl-source-stream'),
watchify = require('watchify'),
streamify = require('streamify'),
browserify = require('browserify');

   var gulp = require('gulp'),
       glp_sass = require('gulp-sass'),
      glp_order = require('gulp-order'),
     glp_concat = require('gulp-concat'),
     glp_inject = require('gulp-inject'),
     glp_jshint = require('gulp-jshint'),
     glp_uglify = require('gulp-uglify'),
    glp_plumber = require('gulp-plumber'),
    glp_changed = require('gulp-changed'),
 glp_livereload = require('gulp-livereload'),
 glp_autoprefix = require('gulp-autoprefixer'),
 glp_sourcemaps = require('gulp-sourcemaps'),
    glp_wiredep = require('wiredep').stream;

var config = require('./build.config.js');


/*************************************
  *    Watcher function / task
**************************************/

function watcher () {
    var server        = glp_livereload(),
        examplesGlob  = config.files.examples.dest + '/**/*.{html,js,css,json}',
        jsWatch       = gulp.watch(config.files.js.src, ['js']),
        jsXWatch      = gulp.watch(config.files.examples.js.src, ['jsExamples']),
        indexWatch    = gulp.watch(config.files.examples.index.src, ['inject']),
        sassWatch     = gulp.watch(config.files.examples.sass.src, ['sass']),
        dataWatch     = gulp.watch(config.files.examples.src + '/data/*.json', ['copy'])
        examplesWatch = gulp.watch(examplesGlob);

    // reloads when files change in build directory
    examplesWatch.on('change', function(event) {
        console.log('build watch');
        server.changed(event.path);
    });
}


/*************************************
  *          Clean Task
**************************************/

gulp.task('clean', clean);

function clean (cb) {
    del([
        config.dist,
        config.files.examples.dest
    ], cb);
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
    var src = './src/brainbeats-engine/index.js';

    return browserify({standalone: 'BrainbeatsEngine', debug: true})
        .transform(es6ify)
        .require(require.resolve(src), {entry: true})
        .bundle()
        .pipe(source('brainbeats-engine.js'))
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
    var bbe = js();

    return gulp.src(config.files.examples.js.src)
        .pipe(glp_plumber())
        .pipe(glp_jshint())
        .pipe(glp_jshint.reporter(jsstyle))
        .pipe(glp_traceur())
        .pipe(gulp.dest(config.files.examples.js.dest));
}


/*************************************
  *           Sass Task
**************************************/

gulp.task('sass', sass);

function sass () {
  return gulp.src(config.files.examples.sass.src)
    .pipe(glp_plumber())
    .pipe(glp_sass())
    .pipe(glp_autoprefix())
    .pipe(gulp.dest(config.files.examples.sass.dest));
}


/*************************************
  *           Copy Task
**************************************/

gulp.task('copy', copy);

function copy () {
    gulp.src(config.files.examples.src + '/data/*')
        .pipe(gulp.dest(config.files.examples.dest + '/data'));
}


/*************************************
  *           Build Task
**************************************/

gulp.task('build', build);

function build (cb) {
  sequence(['js', 'jsExamples', 'sass', 'copy'], 'inject', cb);
}


/*************************************
  *         Inject Task
**************************************/

gulp.task('inject', inject);

function inject () {
    var jsFiles    = gulp.src([config.files.js.dest + '/*.js', config.files.examples.js.dest + '/*.js']),
        cssFiles   = sass(),
        injectStream = es.merge(jsFiles, cssFiles)
            .pipe(glp_order(['brainbeats-engine.js', 'bundle.js']));

    return gulp.src(config.files.examples.index.src)
        .pipe(glp_wiredep({ ignorePath: path.join('../../', config.bower) }))
        .pipe(glp_inject(injectStream, { ignorePath: [config.app, config.dist, config.files.examples.dest] }))
        .pipe(gulp.dest(config.files.examples.dest));
}


/*************************************
  *          Serve Task
**************************************/

gulp.task('serve', ['build', 'inject'], serve);

function serve ( ){
    var port = 9000,
    app = connect()
        .use(morgan('dev'))
        .use('/soundscapes', proxy(url.parse('http://localhost:1337/soundscapes')))
        .use('/users', proxy(url.parse('http://localhost:1337/users')))
        .use(static(path.join(__dirname, config.dist)))
        .use(static(path.join(__dirname, config.bower)))
        .use(static(path.join(__dirname, config.files.examples.dest)));

    app.on('error', function(error) {
    // console.log('Unable to start server\n');
        callback(error);
    });

    app.on('listening', function() {
    // console.log('app address:', app.address());
        callback();
    });

    http.createServer(app).listen(port);
    // open('http://localhost:9000');
    watcher();
}


/*************************************
  *        Auto reload gulp
**************************************/

gulp.task('reload', reload);

function reload () {
    var process;
    function restart() {
        console.log('restarting gulp');
        if (process) {
            process.kill();
        }
        process = spawn('gulp', ['serve'], {stdio: 'inherit'});
    }
    gulp.watch('gulpfile.js', restart);
    restart();
}


/*************************************
  *      Start the reload task
**************************************/

gulp.task('start', start);

function start (cb) {
    sequence('clean', 'reload', cb);
}
