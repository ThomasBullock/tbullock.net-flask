"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");

var paths = {
  styles: {
    src: "src/main.scss",
    dest: "flaskapp/static/styles",
  },
};

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.styles.dest));
}

function clean() {
  return del(["static/styles/**/*"]);
}

function watch() {
  gulp.watch(paths.styles.src, styles);
}

// gulp.task("compileSass", function () {
//   return gulp
//     .src("src/main.scss")
//     .pipe(maps.init())
//     .pipe(sass().on("error", sass.logError))
//     .pipe(autoprefixer())
//     .pipe(maps.write("./"))
//     .pipe(gulp.dest("css"));
// });

const build = gulp.series(clean, gulp.parallel(styles));

exports.styles = styles;
exports.watch = watch;
exports.build = build;
