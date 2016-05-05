var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


var watchify = require('watchify');
//var browserSync = require('browser-sync').create();

var paths = {
  scripts: ['./devScripts/*.js', './devScripts/doctor/*.js'],
};

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      //.pipe(uglify())
      .pipe(concat('bundle.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js'));
});


gulp.task('watch-scripts', function() {
  gulp.watch(paths.scripts, ['scripts']);
});
