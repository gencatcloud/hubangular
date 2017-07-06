'use strict';

var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
var paths = gulp.paths;

gulp.task('build', ['clean', 'test'], function () {
    gulp.start('build-main-files');
});

gulp.task('build:skip-test', ['clean'], function () {
    gulp.start('build-main-files');
});

gulp.task('build-main-files', ['scripts', 'styles', 'images', 'scripts:minify', 'styles:minify']);

gulp.task('scripts', ['partials'], function () {
    return gulp.src([
            path.join(gulp.paths.src, '/**/*.js'),
            path.join(gulp.paths.tmp, 'partials', 'templateCacheHtml.js')
        ])
        .pipe($.angularFilesort())
        .pipe($.ngAnnotate())
        .pipe($.concat('hubangular.js'))
        .pipe(gulp.dest(gulp.paths.dist + '/'));
});

gulp.task('scripts:minify', ['scripts'], function () {
    return gulp.src(path.join(gulp.paths.dist, '/**/*.js'))
        .pipe($.uglify())
        .pipe($.rename(function (path) {
            path.extname = '.min.js';
        }))
        .pipe(gulp.dest(gulp.paths.dist + '/'));
});

gulp.task('styles:minify', ['styles'], function () {
    return gulp.src(gulp.paths.dist + '/**/*.css')
        .pipe($.csso())
        .pipe($.rename(function (path) {
            path.extname = '.min.css';
        }))
        .pipe(gulp.dest(gulp.paths.dist + '/'));
});

var sassOptions = {
    style: 'expanded',
    includePaths: [
        'bower_components'
    ]
};

gulp.task('styles', function () {
    var injectFiles = gulp.src([
        gulp.paths.src + '/**/*.scss',
        '!' + gulp.paths.src + '/hubangular.scss',
        '!' + gulp.paths.src + '/**/_*.scss'
    ], {read: false});

    var injectOptions = {
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };

    var indexFilter = $.filter('hubangular.scss', {
        restore: true
    });

    return gulp.src(path.join(gulp.paths.src, '/hubangular.scss'))
        .pipe(indexFilter)
        .pipe($.inject(injectFiles, injectOptions))
        .pipe(indexFilter.restore)
        .pipe($.sass(sassOptions))

        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']}))
        .on('error', function handleError(err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(gulp.paths.dist + '/'));
});

gulp.task('partials', function () {
    return gulp.src([
            gulp.paths.src + '/**/*.html'
        ])
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: 'hubangular'
        }))
        .pipe(gulp.dest(gulp.paths.tmp + '/partials/'));
});

gulp.task('images', function () {
    return gulp.src(gulp.paths.src + '/images/**/*')
        .pipe(gulp.dest(gulp.paths.dist + '/assets/images/'));
});

gulp.task('clean', function () {
    return $.del([path.join(gulp.paths.dist, '/'), path.join(gulp.paths.tmp, '/')]);
});
