const { src, dest, series, watch } = require("gulp");
const del = require("del");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const sass = require("gulp-sass")(require("sass"));
const svgSprite = require("gulp-svg-sprite");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default;
const notify = require("gulp-notify");
const sourceMaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

const clean = () => {
  return del(["dist", "build"]);
};

const svgSprites = () => {
  return src("src/images/svg/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    removeAttrs: {
                      attrs: ["class", "data-name", "fill"],
                    },
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(dest("dist/images"))
    .pipe(browserSync.stream());
};

const distFonts = () => {
  return src("src/fonts/**")
    .pipe(dest("dist/fonts"))
    .pipe(browserSync.stream());
};

const distResources = () => {
  return src("src/resources/**")
    .pipe(sourceMaps.init())
    .pipe(sourceMaps.write())
    .pipe(dest("dist/resources"))
    .pipe(browserSync.stream());
};

const distHtml = () => {
  return src("src/**/*html").pipe(dest("dist")).pipe(browserSync.stream());
};

const distStyles = () => {
  return src("src/styles/**/*.scss")
    .pipe(sourceMaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("style.css"))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCss({
        level: 2,
      })
    )
    .pipe(sourceMaps.write())
    .pipe(dest("dist/styles"))
    .pipe(browserSync.stream());
};

const distScripts = () => {
  return src(["src/js/components/**/*.js", "src/js/main.js"])
    .pipe(sourceMaps.init())
    .pipe(concat("app.js"))
    .pipe(sourceMaps.write())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
};

const buildFonts = () => {
  return src("dist/fonts/**").pipe(dest("build/fonts"));
};

const buildResources = () => {
  return src("dist/resources/**")
    .pipe(
      cleanCss({
        level: 2,
      })
    )
    .pipe(dest("build/resources"));
};

const buildHtml = () => {
  return src("dist/**/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("build"));
};

const buildStyles = () => {
  return src("dist/styles/**/*.css")
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCss({
        level: 2,
      })
    )
    .pipe(dest("build/styles"));
};

const buildScripts = () => {
  return src(["dist/js/**/*.js"])
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("app.js"))
    .pipe(uglify({ toplevel: true }).on("error", notify.onError()))
    .pipe(dest("build/js"));
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
};

watch("src/fonts/**", distFonts);
watch("src/resources/**", distResources);
watch("src/**/*.html", distHtml);
watch("src/styles/**/*.scss", distStyles);
watch("src/js/**/*.js", distScripts);

watch("dist/fonts/**", buildFonts);
watch("dist/resources/**", buildResources);
watch("dist/**/*.html", buildHtml);
watch("dist/styles/**/*.css", buildStyles);
watch("dist/js/**/*.js", buildScripts);

watch("src/images/svg/**/*.svg", svgSprites);

exports.clean = clean;
exports.distStyles = distStyles;

exports.default = series(
  clean,
  svgSprites,

  distFonts,
  distResources,
  distHtml,
  distScripts,
  distStyles,

  buildFonts,
  buildResources,
  buildHtml,
  buildStyles,
  buildScripts,

  watchFiles
);
