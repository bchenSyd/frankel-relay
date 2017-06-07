var path = require('path');
var gulp = require('gulp');
var changed = require('gulp-changed');


var destinationFolders = require('./targets')
var REACT_RELAY_SRC = './dist/react-relay/**/*.js';
var RELAY_RUNTIME_SRC = './dist/relay-runtime/**/*.js';
var RELAY_COMPILER_SRC = './dist/relay-compiler/**/*.js';
var BABEL_PLUGIN_RELAY_SRC = './dist/babel-plugin-relay/**/*.js';
var RELAY_DEST = destinationFolders.map(dest => {
    var dest = path.resolve(dest, 'node_modules/');
    console.log(`auto sync to ${dest}/react-relay and  ${dest}/relay-runtime`);
    return dest;
});

// dev task
gulp.task('relay', ['react-relay']);
gulp.task('default', ['babel-plugin-relay','relay-runtime','relay-compiler','react-relay']);


gulp.task('relay-runtime', ['relay-runtime-copy-source'], function () {
    gulp.watch(RELAY_RUNTIME_SRC, ['relay-runtime-copy-source']);
});

gulp.task('react-relay', ['react-relay-copy-source'], function () {
   gulp.watch(REACT_RELAY_SRC, ['react-relay-copy-source']);
});

gulp.task('relay-compiler', ['relay-compiler-copy-source'], function () {
    gulp.watch(RELAY_COMPILER_SRC, ['relay-compiler-copy-source']);
});

gulp.task('babel-plugin-relay', ['babel-plugin-relay-copy-source'], function () {
    gulp.watch(BABEL_PLUGIN_RELAY_SRC, ['babel-plugin-relay-copy-source']);
});

gulp.task('react-relay-copy-source', function () {
    RELAY_DEST.forEach(dest => {
        const relay_dest = path.join(dest, 'react-relay');
        gulp.src(REACT_RELAY_SRC)
            .pipe(changed(relay_dest, { hasChanged: changed.compareSha1Digest }))
            .pipe(gulp.dest(relay_dest));
    })

});

gulp.task('relay-runtime-copy-source', function () {
    RELAY_DEST.forEach(dest => {
        const runtime_dest = path.join(dest, 'relay-runtime');
        gulp.src(RELAY_RUNTIME_SRC)
            .pipe(changed(runtime_dest, { hasChanged: changed.compareSha1Digest }))
            .pipe(gulp.dest(runtime_dest));
    })
});

gulp.task('relay-compiler-copy-source', function () {
    RELAY_DEST.forEach(dest => {
        const runtime_dest = path.join(dest, 'relay-compiler');
        gulp.src(RELAY_COMPILER_SRC)
            .pipe(changed(runtime_dest, { hasChanged: changed.compareSha1Digest }))
            .pipe(gulp.dest(runtime_dest));
    })

});

gulp.task('babel-plugin-relay-copy-source', function () {
    RELAY_DEST.forEach(dest => {
        const runtime_dest = path.join(dest, 'babel-plugin-relay');
        gulp.src(BABEL_PLUGIN_RELAY_SRC)
            .pipe(changed(runtime_dest, { hasChanged: changed.compareSha1Digest }))
            .pipe(gulp.dest(runtime_dest));
    })

});


