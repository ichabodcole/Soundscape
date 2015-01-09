var buildConfig = require('./build.config.js');
var browserify = require('browserify');

module.exports = function (config) {
    config.set({
        basePath: '',

        browsers: ['Chrome'],

        frameworks: ['jasmine', 'browserify', 'sinon'],

        preprocessors: {
            'src/soundscape/**/*.js' : ['browserify'],
            'test/specs/**/*.spec.js': ['browserify']
        },

        browserify: {
            transform: ['es6ify'],
            debug: true,
            prebundle: function (bundle) {
                bundle.require('./bower_components/traceur-runtime/traceur-runtime.js')
            }
        },

        files: [
            'bower_components/traceur-runtime/traceur-runtime.js',
            { pattern: 'src/soundscape/**/*.js', included:false, served: true },
            // { pattern: 'test/specs/soundscape/modules/*.spec.js', included:false },
            //{ pattern: 'test/specs/soundscape/services/*.spec.js', included:false },
            { pattern: 'test/specs/soundscape/property-controls/*.spec.js', included:false }
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

        reporters: ['nyan', 'osx'],
        port: 9876,
        colors: true
    });
};
