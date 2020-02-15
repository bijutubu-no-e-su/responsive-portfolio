import gulp from 'gulp';
// const gulp = require('gulp');
import browserSync from 'browser-sync';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';
import babel from 'gulp-babel';

gulp.task('sass', () => {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('babel', () => {
  return gulp
    .src('./src/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});

gulp.task('lint', () => {
  return gulp
    .src(['./src/js/*.js', '!node_modules/**'])
    .pipe(eslint({ useEslintrc: true })) // .eslintrc を参照
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
gulp.task('serve', done => {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html'
    }
  });
  done();
});
gulp.task('watch', () => {
  const browserReload = done => {
    browserSync.reload();
    done();
  };
  gulp.watch('./dist/**/*', browserReload);
  gulp.watch('./src/scss/*.scss', gulp.series('sass'));
  // gulp.watch('./src/js/*.js', gulp.series('lint'));
  gulp.watch('./src/js/*.js', gulp.series('babel'));
});

gulp.task('default', gulp.series('serve', 'watch'));
