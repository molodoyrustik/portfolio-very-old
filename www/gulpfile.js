var gulp      = require("gulp"),
    connect   = require('gulp-connect'),
    opn       = require("opn"),
	wiredep   = require('wiredep').stream,
    useref    = require('gulp-useref'),
    gulpif    = require('gulp-if'),
    uglify    = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    clean     = require('gulp-clean');


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

// Clean
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});
// Build
gulp.task('build', ['clean'], function () {
    gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
    gulp.src('app/img/**/*.+(jpg|png|svg)').pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function () {
    gulp.watch(['./app/*.html'], ['html']);
    gulp.watch(['./app/css/*.css'], ['css']);
    gulp.watch(['./app/js/*.js'], ['js']);
    gulp.watch(['bower.json'], ['bower']);
});
 
gulp.task('default', ['connect', 'watch']);