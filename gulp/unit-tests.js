'use strict';

'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')();
var Server = require("karma").Server;
var paths = gulp.paths;
var path = require('path');

function runTests(singleRun, callback) {
    var testError = false;
    var browsersNotFound = 0;

    var server = new Server({
        configFile: path.join(__dirname, '..', '.tmp', 'karma.conf.js'),
        singleRun: singleRun,
        autoWatch: !singleRun
    }, function () {
        if (browsersNotFound > 0)
            $.util.log($.util.colors.yellow("[WARNING]", browsersNotFound, "browsers aren't execute tests. See Karma logs for more info"));
        //Use var to prevent karma throw error if browser not found 
        if (testError) {
            callback($.util.colors.red("Unit tests failures"));
        } else {
            callback();
        }
    });
    server.start();

    //count browsers not found or fail on execute
    server.on('browser_process_failure', function () {
        browsersNotFound++;
    });

    //check all test passed.
    server.on('run_complete', function (browsers, results) {
        testError = results.failed > 0;
    });
}

gulp.task('test', ['test:inject-karma-conf'], function (callback) {
    runTests(true, callback);
});

gulp.task('test:dev', ['test:inject-karma-conf'], function (callback) {
    runTests(false, callback);
});


gulp.task('test:inject-karma-conf', ['partials'], function () {
    var destinationPath = paths.tmp;
    //get all bower dependencies
    var bowerOptions = ({
        exclude: ['bootstrap-sass-official', /.+\.min\.js/, /.+\.min\.css/],
        dependencies: true,
        devDependencies: true,
        fileTypes: {
            js: {
                replace: {
                    js: function (filePath) {
                        return "\"" + path.posix.relative(destinationPath, filePath) + "\",";
                    }
                }
            }
        }
    });

    var projectFiles = gulp.src([paths.src + '/**/*.js', paths.tmp + '/partials/*.js'])
        .pipe($.angularFilesort());
    var testFiles = gulp.src(paths.test + '/**/*.js');

    var injectOptions = function (startTag) {
        return {
            starttag: "// " + startTag + ":js",
            endtag: "// endinject",
            transform: function (filepath, file, i, length) {
                return "\"" + path.posix.relative(destinationPath, filepath.substr(1)) + "\"" + (startTag == "project" || i < length - 1 ? "," : "");
            }
        }
    };

    return gulp
        .src("./karma.conf.js")
        .pipe(wiredep(bowerOptions))
        .pipe($.inject(projectFiles, injectOptions("project")))
        .pipe($.inject(testFiles, injectOptions("spec")))
        .pipe(gulp.dest(destinationPath));
});
