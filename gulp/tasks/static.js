var gulp = require('gulp');
var config = require('../config').static;

gulp.task('static', function () {
  gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});





