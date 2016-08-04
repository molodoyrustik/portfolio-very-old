var gulp = require("gulp"),
    connect = require('gulp-connect'),
    opn = require("opn"),
	wiredep = require('wiredep').stream;



gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true,
        port:8888
    });
    opn("http://localhost:8888")
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./app/css/*.css')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});

// Bower
gulp.task('bower', function () {
  gulp.src('./app/*.html')
    .pipe(wiredep({
      directory: 'app/bower/'
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('watch', function () {
    gulp.watch(['./app/*.html'], ['html']);
    gulp.watch(['./app/css/*.css'], ['css']);
    gulp.watch(['./app/js/*.js'], ['js']);
    gulp.watch(['bower.json'], ['bower']);
});
 
gulp.task('default', ['connect', 'watch']);