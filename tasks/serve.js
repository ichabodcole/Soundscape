'use strict';

var gulp        = require('gulp'),
    http        = require('http'),
    path        = require('path'),
    connect     = require('connect'),
    morgan      = require('morgan'),
    serveStatic = require('serve-static'),
    config      = require('../build.config.js');

/*************************************
  *          Serve Task
**************************************/

gulp.task('serve', ['build', 'inject'], serve);

function serve ( ){
    var port = 9000,
    app = connect()
        .use(morgan('dev'))
        .use(serveStatic(path.join(__dirname, '../', config.dist)))
        .use(serveStatic(path.join(__dirname, '../', config.bower)))
        .use(serveStatic(path.join(__dirname, '../', config.files.examples.dest)));

    app.on('error', function(error) {
        callback(error);
    });

    app.on('listening', function() {
        callback();
    });

    http.createServer(app).listen(port);
}
