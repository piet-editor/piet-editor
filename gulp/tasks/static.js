const gulp = require('gulp');
const config = require('../config').static;

gulp.task('static', () => {
  gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
