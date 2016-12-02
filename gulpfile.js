var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var del = require('del');
var runSequence = require('run-sequence');
var lazypipe = require('lazypipe');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var options = {
  dev: 'dev',
  dist: 'app',
  tmp: '.tmp',
  local: 'local_files'
};

gulp.task('sass', function() {
  return gulp.src(options.dev + '/scss/*.scss')
    .pipe($.plumber())
    .pipe($.sassGlobImport())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      sourceComments: true,
      includePaths: ['.', 'bower_components']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 2 versions']}))
    .pipe($.tap(function(file, t) {
      file.contents = new Buffer(file.contents.toString().replace(/(\* line [0-9]+\, )(\/.*)(\/scss.*\*\/)/g, '$1..$3'));
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(options.tmp + '/css'));
});

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

gulp.task('clean', del.bind(null, [options.tmp, options.dist]));

gulp.task('inject', function() {
  gulp.src(options.dev + '/index.html')
  .pipe($.inject(gulp.src([
    options.dev + '/partials/**/*.js',
    options.tmp + '/partials/**/*.js',
  ], {read: false}), {relative: true}))
  .pipe($.tap(function(file, t) {
    file.contents = new Buffer(file.contents.toString().replace(/\.\.\/\.tmp\//g, ''));
  }))
  .pipe(gulp.dest(options.tmp));
});

gulp.task('html', ['sass', 'img', 'fonts'], function() {  
  return gulp.src(options.tmp + '/*.html')
    .pipe($.plumber())
    .pipe($.eol())
    .pipe($.useref({
      searchPath: ['.', options.dev, options.tmp],
    },
    lazypipe().pipe($.sourcemaps.init, { loadMaps: true })))
  
    // .pipe($.if('*/main.js', $.ngAnnotate()))
    // .pipe($.if('*/main.js', $.uglify())) //$.uglify({mangle: false})

    .pipe($.if('*.js', $.rev()))
    .pipe($.if('*.css', $.rev()))
    .pipe($.revReplace())

    .pipe($.sourcemaps.write('maps'))
    .pipe(gulp.dest(options.dist));
});

gulp.task('build', function(callback) {
  runSequence(
    'clean',
    'inject',
    'html',
    callback
  );
});

gulp.task('serve-dev', ['build'], function() {
  browserSync({
    //notify: false,
    port: 9000,
    server: {
      baseDir: ['local_files', '.tmp', 'dev'],
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    open: false
  });

  gulp.watch([
    options.dev + '/partials/**/*',
    options.dev + '/scss/**/*.scss',
    options.dev + '/scss/**/**/*.scss',
    options.dev + '/*.html'
  ], ['build']
  );

  gulp.watch(options.dev + '/img/**/*', ['img']).on('change', reload);
  gulp.watch(options.dev + '/fonts/**/*', ['fonts']).on('change', reload);

  gulp.watch(options.local + '/**/*').on('change', reload);
});

gulp.task('serve', ['build'], function() {

  browserSync({
    //notify: false,
    port: 9000,
    server: {
      baseDir: ['app']
    },
    open: false
  });

  gulp.watch([
    options.dev + '/scss/**/*.scss',
    options.dev + '/partials/**/*',
    options.dev + '/*.html'
  ], ['build']
  );

  gulp.watch(options.dev + '/img/**/*', ['img']).on('change', reload);
  gulp.watch(options.dev + '/fonts/**/*', ['fonts']).on('change', reload);
});

gulp.task('copy-files', function() {
  return gulp.src('CNAME')
    .pipe($.changed(options.dist))
    .pipe(gulp.dest(options.dist));
});

gulp.task('publish', function() {
  return gulp.src(["./app/**/*"])
    .pipe($.ghPages());
});

gulp.task('deploy', function(callback) {
  runSequence(
    'build',
    'copy-files',
    'publish',
    callback
  );
});