var config = {
    app: 'src',
    dist: 'dist',
    bower: 'bower_components'
};

var explsSrc = config.app + '/examples',
    explsDst = 'examples';

config.files = {
    js: {
        src: config.app + '/soundscape/**/*.js',
        dest: config.dist
    },
    examples: {
        src: explsSrc,
        dest: explsDst,
        index: {
            src: explsSrc + '/index.html',
            dest: explsDst + '/index.html'
        },
        js: {
            src: explsSrc + '/**/*.js',
            dest: explsDst
        },
        sass: {
            src: explsSrc + '/**/*.scss',
            dest: explsDst + '/css'
        }
    }
};

module.exports = config;
