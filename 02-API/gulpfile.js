var gulp = require('gulp'),
  connect = require('gulp-connect-multi')(),
  sequence = require('gulp-sequence'),
  runSequence = require('run-sequence');

gulp.task('browserify', function () {
  var browserify = require('browserify'),
    babelify = require('babelify'),
    hbsfy = require('hbsfy'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('gulp-buffer');

  return browserify('./src/app.js')
    .transform(babelify)
    .transform(hbsfy)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('style', function () {
  gulp.src('./src/stylesheets/*.css')
    .pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('clean', function () {
  var clean = require('gulp-clean');

  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch('./src/*.html', function () {
    runSequence('copy', 'reconnect');
  });

  gulp.watch('./src/templates/*.hbs', function () {
    runSequence('browserify', 'reconnect');
  });

  gulp.watch('./src/*.js', function () {
    runSequence('browserify', 'reconnect');
  });

  gulp.watch('./src/*.js', function () {
    runSequence('style', 'reconnect');
  });
});

gulp.task('reconnect', function () {
  gulp.src('./dist/index.html')
    .pipe(connect.reload());
})

gulp.task('connect', function() {
  var serveStatic = require('serve-static'),
    fs = require('fs');

  gulp.task('connect', connect.server({
    root: './dist',
    port: 3000,
    livereload: true,
    open: {
      browser: undefined
    },
    middleware: (connect, options) => {
      const middlewares = [];

      if (!Array.isArray(options.root)) {
        options.root = [options.root]
      }

      options.root.forEach(function (root) {
        middlewares.push(serveStatic(root))
      });

      // default: index.html
      middlewares.push((req, res) => {
        fs
          .createReadStream(`${options.root}/index.html`)
          .pipe(res)
      });
      return middlewares;
    }
  }));
});

gulp.task('default', sequence(['clean'], 'copy', 'style', 'browserify'));
gulp.task('start', sequence(['default'], 'connect', 'watch'));




