var path = require('path');
var gulp = require('gulp');
var changed = require('gulp-changed');


var destinationFolders = require('./targets')
var REACT_RELAY_SRC = './react-relay/**/*.js';
var RELAY_RUNTIME_SRC = './relay-runtime/**/*.js';
var RELAY_DEST = destinationFolders.map(dest => {
    var dest = path.resolve(dest, 'node_modules/');
    console.log(`auto sync to ${dest}/react-relay and  ${dest}/relay-runtime`);
    return dest;
});

// dev task
gulp.task('default', ['relay runtime sync','relay sync'])
gulp.task('relay runtime sync', ['relay-runtime-copy-source'], function () {
    gulp.watch(RELAY_RUNTIME_SRC, ['relay-runtime-copy-source']);
});

gulp.task('relay sync', ['react-relay-copy-source'], function () {
    gulp.watch(REACT_RELAY_SRC, ['react-relay-copy-source']);
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


