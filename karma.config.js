var buildConfig = require('./build.config.js');

module.exports = function (config) {
    config.set({
        basePath: '',

        browsers: ['Chrome'],

        frameworks: ['jasmine', 'traceur', 'requirejs'],

        preprocessors: {
           'src/soundscape/services/utils.js' : ['traceur']
        },

        files: [
            // {pattern: 'src/soundscape/**/*.js', included:false},
            { pattern: 'src/soundscape/services/utils.js', included:false },
            { pattern: 'test/specs/**/*.spec.js', included:false },
            { pattern: 'bower_components/traceur-runtime/traceur-runtime.js', included:false },
            'test/test-main.js'
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
