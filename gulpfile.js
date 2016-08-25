var gulp      = require("gulp"),
    wiredep   = require('wiredep').stream,
    useref    = require('gulp-useref'),
    uglify    = require('gulp-uglify'),
    clean     = require('gulp-clean');
    gulpif    = require('gulp-if'),
    filter    = require('gulp-filter'),
    size      = require('gulp-size'),
    imagemin  = require('gulp-imagemin'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    jade      = require('gulp-jade'),
    prettify  = require('gulp-prettify'),
    browserSync = require('browser-sync'),
    gutil     = require('gulp-util'),
    ftp       = require('vinyl-ftp'),
    reload    = browserSync.reload,
    connect   = require('gulp-connect'),
    opn       = require("opn");



// ===============================================================================
// ===============================================================================
// =============================   Работа в APP  =================================

// Компилируем Jade в html 
gulp.task('jade', function() {
    gulp.src('app/templates/pages/*.jade')
    .pipe(jade())
    .on('error', log)
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('app/'))
    .pipe(reload({stream: true}));
});

// Bower
gulp.task('wiredep', function () {
  gulp.src('app/templates/common/*.jade')
    .pipe(wiredep({
        ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app/templates/common/'));
});

// Запускаем локальный сервер (только после компиляции Jade)
gulp.task('server', ['jade'], function() {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baserDir: 'app'
        }
    })
});


// слежка и запусл задачи
gulp.task('watch', function() {
    gulp.watch('app/templates/**/*.jade', ['jade']);
    gulp.watch('bower.json', ['wiredep']);
    gulp.watch([
        'app/js/**/*.js',
         'app/css/**/*.css',
        ]).on('change', reload);
});


// Задача по-умолчанию
gulp.task('default', ['server', 'watch']);


// ===============================================================================
// ===============================================================================
// =============================   СБОРКА   ======================================

// Очистка папки 
gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean());
});

// Переносим HTML, CSS, JS в папку dist
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

// Перенос шрифтов
gulp.task('fonts', function () {
    gulp.src('app/fonts/*')
    .pipe(gulp.dest('dist/fonts/'));
})

// Картинки 
gulp.task('images', function () {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/img'));
});

// Остальные файлы такие как favicon.ico и пр.
gulp.task('extras', function () {
    return gulp.src([
        'app/*.*',
        '!app/*.html'
        ]).pipe(gulp.dest('dist'));
});


// Сборка в вывод размера содержимого папки dist
gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function () {
    return gulp.src('dist/**/*').pipe(size({title: 'build'}));
})

// Собираем папку DIST
gulp.task('build', ['clean', 'jade'], function () {
    gulp.start('dist');
})








// ===============================================================================
// ===============================================================================
// =============================   Функции   =====================================
 
// Более наглядный вывод ошибок 
var log = function (error) {
    console.log([
        '',
        '---------------------- ERROR MESSAGE START ----------------------',
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        '---------------------- ERROR MESSAGE END ----------------------',
        ''
        ].join('\n'));
        this.end();
}


// ===============================================================================
// ===============================================================================
// ==============================  Важные моменты  ===============================
// gullp.task(name, deps, fn);
// deeps - массив задач, которые будут выполнены ДО запуска задачи name 
// внимательно следите за порядком выполнения задач!

// ===============================================================================
// ===============================================================================
// ==============================  ДЕПЛОЙ  ===============================


gulp.task('deploy', function() {
    var conn = ftp.create( {
        host: 'dz1.kovalchuk.us',
        user: 'kovaldn_test',
        password: 'changed',
        parallel: 10,
        log: gutil.log
    } );

    var globs = [
        'dist/**/*'
    ];

    return gulp.src(globs, { base: 'dist/', buffer: false } )
        .pipe(conn.dest('public_html'));
});



















// gulp.task('connect', function() {
//     connect.server({
//         root: 'app',
//         livereload: true,
//         port:8888
//     });
//     opn("http://localhost:8888")
// });

// gulp.task('html', function () {
//   gulp.src('./app/*.html')
//     .pipe(connect.reload());
// });

// gulp.task('css', function () {
//   gulp.src('./app/css/*.css')
//     .pipe(connect.reload());
// });

// gulp.task('js', function () {
//   gulp.src('./app/js/*.js')
//     .pipe(connect.reload());
// });

// gulp.task('watch', function () {
//     gulp.watch(['./app/*.html'], ['html']);
//     gulp.watch(['./app/css/*.css'], ['css']);
//     gulp.watch(['./app/js/*.js'], ['js']);
//     gulp.watch(['bower.json'], ['wiredep']);
// });
 
// gulp.task('default', ['connect', 'watch']);