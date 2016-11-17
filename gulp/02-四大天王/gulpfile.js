var gulp = require('gulp');

gulp.task('read', function() {
    gulp.src('./file') //读取同目录下的file文件
});


gulp.task('readWrite', function() {
    gulp.src('./file')
        .pipe(gulp.dest('./path'));
});

gulp.task('watch',function () {
    gulp.watch('file', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ' at ' + new Date());
    });
})
