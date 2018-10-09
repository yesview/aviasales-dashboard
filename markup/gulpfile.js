var gulp = require("gulp"),
    sass = require("gulp-ruby-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    cleanCSS = require("gulp-clean-css"),
    imagemin = require("gulp-imagemin"),
    concat = require("gulp-concat"),
    browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");

gulp.task("default", ["build", "watch"]);

gulp.task("build", ["sass", "image", "js", "pages", "fonts"]);

gulp.task("fonts", () =>
    gulp
        .src("fonts/**")
        .pipe(gulp.dest("build/fonts"))
);

gulp.task("sass", () =>
    sass("assets/sass/*.scss", { sourcemap: true })
        .on("error", sass.logError)
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(
            sourcemaps.write("maps", {
                includeContent: false,
                sourceRoot: "css"
            })
        )
        .pipe(gulp.dest("css"))
        .pipe(gulp.dest("build/css"))
        .pipe(gulp.dest("../frontend/aviasales/public"))
);

gulp.task("image", () =>
    gulp
        .src("assets/images/**")
        .pipe(imagemin())
        .pipe(gulp.dest("images"))
        .pipe(gulp.dest("build/images"))
        .pipe(gulp.dest("../frontend/aviasales/public/images"))
);

gulp.task("js", function() {
    gulp
        .src(["assets/js/**"])
        .pipe(concat("all.js"))
        .pipe(
            sourcemaps.write("maps", {
                includeContent: false,
                sourceRoot: "js"
            })
        )
        .pipe(gulp.dest("js"))
        .pipe(gulp.dest("build/js"))
});

gulp.task("pages", function() {
    gulp.src(["pages/**"]).pipe(gulp.dest("build/pages"));
});

gulp.task("watch", function() {
    gulp.watch("assets/sass/**", ["sass"]);
    gulp.watch("assets/js/**", ["js"]);
    gulp.watch("pages/**", ["pages"]);
    gulp.watch("assets/images/**", ["image"]).on("change", browserSync.reload);
});
