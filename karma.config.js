var buildConfig = require('./build.config.js');
// var browserify = require('browserify');

module.exports = function (config) {
    config.set({
        basePath: '',

        browsers: ['Chrome'],

        frameworks: ['jasmine', 'browserify'],

        preprocessors: {
           'src/soundscape/services/utils.js' : ['browserify'],
           'test/specs/**/*.spec.js': ['browserify']
        },

        browserify: {
            transform: ['es6ify'],
            debug: true
        },

        files: [
            // {pattern: 'src/soundscape/**/*.js', included:false},
            { pattern: 'src/soundscape/services/utils.js', included:false },
            { pattern: 'test/specs/**/*.spec.js', included:false },
            { pattern: 'bower_components/traceur-runtime/traceur-runtime.js', included:false }
        ],

        exclude: [
            'src/soundscape/index.js'
        ],

        traceurPreprocessor: {
            options: {
                sourceMaps: true,
                modules: 'amd',
                // annotations: true,
                // types: true
            }
            // custom filename transformation function
            // transformPath: function(path) {
            // return path.replace(/\.es6$/, '.js');
            // }
        },

        reporters: ['progress'],
        port: 9876,
        colors: true
    });
};
