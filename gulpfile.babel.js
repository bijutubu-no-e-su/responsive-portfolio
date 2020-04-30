import gulp from "gulp";
// const gulp = require('gulp');
import browserSync from "browser-sync";
import eslint from "gulp-eslint";
import sass from "gulp-sass";
import babel from "gulp-babel";
import browserify from "browserify";
import source from "vinyl-source-stream";
import babelify from "babelify";

gulp.task("sass", () => {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/css"));
});
// gulp.task('babel', () => {
//   return gulp
//     .src('./src/js/*.js')
//     .pipe(babel())
//     .pipe(gulp.dest('./dist'));
// });

gulp.task("browserify", () => {
  return browserify({
    entries: ["./src/js/main.js"]
  })
    .transform(babelify)
    .bundle()
    .on("error", function(err) {
      console.log("Error : " + err.message);
    })
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("lint", () => {
  return gulp
    .src(["./src/js/*.js", "!node_modules/**"])
    .pipe(eslint({ useEslintrc: true })) // .eslintrc を参照
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
gulp.task("serve", done => {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: "index.html"
    }
  });
  done();
});
gulp.task("watch", () => {
  const browserReload = done => {
    browserSync.reload();
    done();
  };
  gulp.watch("./src/scss/*.scss", gulp.series("sass"));
  gulp.watch("./src/scss/*/*.scss", gulp.series("sass"));
  // gulp.watch('./src/js/*.js', gulp.series('lint'));
  // gulp.watch('./src/js/*.js', gulp.series('babel'));
  gulp.watch("./src/js/*.js", gulp.series("browserify"));
  gulp.watch("./dist/**/*", browserReload);
});

gulp.task("default", gulp.series("serve", "watch"));
gulp.task("build", gulp.series("sass", "browserify"));
