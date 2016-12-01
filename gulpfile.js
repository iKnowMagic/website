var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var del = require('del');

var runSequence = require('run-sequence');
var lazypipe = require('lazypipe');

var options = {
  dev: 'dev',
  dist: 'app',
  tmp: '.tmp',
  local: 'local_files'
};

gulp.task('img', function() {
  return gulp.src(options.dev + '/img/**/*')
    .pipe($.plumber())
    .pipe($.changed(options.dist + '/img/'))
    .pipe(gulp.dest(options.dist + '/img/'));
});

gulp.task('fonts', function() {
  return gulp.src(options.dev + '/fonts/**/*')
    .pipe($.plumber())
    .pipe($.changed(options.dist + '/fonts/'))
    .pipe(gulp.dest(options.dist + '/fonts/'));
});

gulp.task('html', ['img', 'fonts'], function() {

  return gulp.src(options.tmp + '/*.html')
    .pipe($.plumber())
    .pipe($.eol())
    .pipe($.useref({
      searchPath: ['.', options.dev, options.tmp],
    },
    lazypipe().pipe($.sourcemaps.init, { loadMaps: true })))

    // .pipe($.if('*/main.js', $.ngAnnotate()))
    // .pipe($.if('*/main.js', $.uglify())) //$.uglify({mangle: false})

    .pipe($.if(/^((?!config\.js).)*\.js$/, $.rev())) //do not use rev() on config.js
    .pipe($.if('*.css', $.rev()))
    .pipe($.revReplace())

    .pipe($.sourcemaps.write('maps'))
    .pipe(gulp.dest(options.dist));
});