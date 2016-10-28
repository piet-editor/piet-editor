const gulp = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const webpack = require('gulp-webpack');
const config = require('../config');

gulp.task('webpack', () => {
  gulp.src(config.webpack.entry)
    .pipe(webpack(config.webpack))
    .pipe(gulpif(config.js.uglify, uglify()))
    .pipe(gulp.dest(config.js.dest));
});
