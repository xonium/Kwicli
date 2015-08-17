/// <binding Clean='clean' />

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    project = require("./project.json"),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    buffer = require('vinyl-buffer'),
    reactify = require('reactify');

var paths = {
    webroot: "./" + project.webroot + "/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

gulp.task('rotationDev', function () {
    Build('./content/js/RotationRoot.js', 'rotation.js');
});

function Build (rootFile, destinationFile) {
    var bundler = browserify({
        entries: [rootFile], // Only need initial file, browserify finds the deps        
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source(destinationFile))
    // This is where you add uglifying etc.
        .pipe(gulp.dest(paths.webroot + 'js'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .transform(babelify)
    .bundle() // Create the initial bundle when starting the task
    .pipe(source(destinationFile))
    .pipe(gulp.dest(paths.webroot + 'js'));
}