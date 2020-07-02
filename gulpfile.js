"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

var paths = {
  styles: {
    src: "src/scss/main.scss",
    dest: "flaskapp/static/styles",
  },
  js: {
    src: "src/js/*.js",
    dest: "flaskapp/static/js",
  },
};

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.styles.dest));
}

function js() {
  return gulp
    .src(paths.js.src)
    .pipe(babel())
    .pipe(
      uglify().on("error", function (e) {
        console.log(e);
      })
    )
    .pipe(gulp.dest(paths.js.dest));
}

function clean() {
  return del(["static/styles/**/*", "static/js/**/*"]);
}

function watch() {
  gulp.watch("src/**/*.scss", styles);
  gulp.watch(paths.js.src, js);
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

const build = gulp.series(clean, gulp.parallel(styles, js));

exports.styles = styles;
exports.watch = watch;
exports.build = build;
