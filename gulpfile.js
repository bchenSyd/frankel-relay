var path = require('path');
var gulp = require('gulp');
var changed = require('gulp-changed');

var destinationFolders = ['../frankel-au', '../frankel-uk', 'E:\\learn-relay\\real-world']


var RELAY_SRC = './lib/*';
var RELAY_DEST = destinationFolders.map(dest =>
    path.resolve(dest, 'node_modules/react-relay/lib'));

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