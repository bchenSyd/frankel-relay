var path = require('path');
var gulp = require('gulp');
var changed = require('gulp-changed');


var destinationFolders = require('./targets')
var RELAY_SRC = './*.js';
var RELAY_DEST = destinationFolders.map(dest => {
    var dest = path.resolve(dest, 'node_modules/react-relay/')
    console.log(`auto sync to ${dest}`)
    return dest;}
);

// dev task
gulp.task('default', ['relay-copy-source'], function () {
    gulp.watch(RELAY_SRC, ['relay-copy-source']);
});

gulp.task('relay-copy-source', function () {
    RELAY_DEST.forEach(dest => {
        gulp.src(RELAY_SRC)
            .pipe(changed(dest, { hasChanged: changed.compareSha1Digest }))
            .pipe(gulp.dest(dest));
    })

});