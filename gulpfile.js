var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');

gulp.task('js-debug', function()
{
    return gulp.src('../bin/debug/client/*js')
      //.pipe(browserify())
      //.pipe(uglify())
      .pipe(gulp.dest('../bin'));
});

gulp.task('js-release', function()
{
    return gulp.src('../bin/release/client/*js')
      //.pipe(browserify())
      .pipe(uglify())
      .pipe(stripDebug())
      .pipe(gulp.dest('../bin'));
});

gulp.task('php-debug', function()
{
    return gulp.src('../bin/debug/midtier/**/*php')
      //.pipe(browserify())
      //.pipe(uglify())
      .pipe(gulp.dest('../midtier'));
});

gulp.task('php-release', function()
{
    return gulp.src('../bin/release/midtier/**/*php')
      //.pipe(browserify())
      //.pipe(uglify())
      //.pipe(stripDebug())
      .pipe(gulp.dest('../midtier'));
});

gulp.task('serve', function()
{
    browserSync.init({
        proxy:'localhost:63342',
        open:false
    });

    //watch haxe export files
    gulp.watch("../bin/debug/client/*.js", ['js-debug']);
    gulp.watch("../bin/release/client/*.js", ['js-release']);
    gulp.watch("../bin/debug/midtier/*.php", ['php-debug']);
    gulp.watch("../bin/release/midtier/*.php", ['php-release']);

    gulp.watch("../bin/*.html").on('change', browserSync.reload)
    gulp.watch("../bin/lib/app/*.html").on('change', browserSync.reload);
    gulp.watch("../bin/*.js").on('change', browserSync.reload);
    gulp.watch("../bin/*.css").on('change', browserSync.reload);
    gulp.watch("../midtier/lib/midtier/**/*.php").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);