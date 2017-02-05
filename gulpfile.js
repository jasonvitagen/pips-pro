const
    gulp = require('gulp')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify')
    , rev = require('gulp-rev')
    , del = require('del')
    , inject = require('gulp-inject')
    , shell = require('gulp-shell')
    , series = require('stream-series')
    , uglifyCss = require('gulp-uglifycss');

gulp.task('clean-up', () => {
    return del.sync([
        'public/versioned'
    ]);
});

gulp.task('build-index-external-css', () => {
    return gulp.src([
        './public/css/bootstrap.min.css',
        './public/css/style.css',
        './public/css/font-awesome.min.css',
        './public/css/fontello.css',
        './public/css/loaders.min.css',
        ])
        .pipe(concat('index-external-bundle.css'))
        .pipe(uglifyCss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(rev())
        .pipe(gulp.dest('./public/versioned'));
});

gulp.task('build-about-external-css', () => {
    return gulp.src([
        './public/css/bootstrap.min.css',
        './public/css/style.css',
        './public/css/font-awesome.min.css',
        './public/css/fontello.css',
        './public/css/loaders.min.css',
        ])
        .pipe(concat('about-external-bundle.css'))
        .pipe(uglifyCss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(rev())
        .pipe(gulp.dest('./public/versioned'));
});

gulp.task('build-index-external-js', () => {
    return gulp.src([
        './public/js/jquery.min.js',
        './public/js/bootstrap.min.js',
        './public/js/menumaker.js',
        './public/js/jquery.sticky.js',
        './public/js/sticky-header.js',
        './public/js/back-to-top.js',
        './public/js/jquery.smooth-scroll.min.js',
        './public/js/script.js'])
        .pipe(concat('index-external-bundle.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./public/versioned'));

});

gulp.task('build-about-external-js', () => {
    return gulp.src([
        './public/js/jquery.min.js',
        './public/js/bootstrap.min.js',
        './public/js/menumaker.js',
        './public/js/jquery.sticky.js',
        './public/js/sticky-header.js',
        './public/js/jquery.easing.min.js',
        './public/js/scrolling-nav.js',
        './public/js/accordion.js',
        './public/js/jquery-ui.js',
        './public/js/back-to-top.js',
        './public/js/jquery.smooth-scroll.min.js',
        './public/js/script.js'])
        .pipe(concat('about-external-bundle.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./public/versioned'));

});

gulp.task('version-webpack-bundle', () => {
    return gulp.src('./public/js/bundle.js')
        .pipe(rev())
        .pipe(gulp.dest('./public/versioned'));
});

gulp.task('html-inject', ['build-index-external-css', 'build-index-external-js', 'version-webpack-bundle'], () => {
    return gulp.src('./public/index.html')
        .pipe(inject(gulp.src([
            'public/versioned/index-*.css',
            'public/versioned/about-*.js',
            'public/versioned/bundle-*.js',
        ], {read: false}), {
            addRootSlash: true,
            ignorePath: ['public']
        }))
        .pipe(gulp.dest('public'))
});

gulp.task('about-inject', ['build-about-external-css', 'build-about-external-js'], () => {
    return gulp.src([
            './public/about.html',
            './public/privacy-policy.html',
            './public/terms-of-use.html',
        ])
        .pipe(inject(gulp.src([
            'public/versioned/index-*.css',
            'public/versioned/about-*.js'
        ], {read: false}), {
            addRootSlash: true,
            ignorePath: ['public']
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('build', ['html-inject', 'about-inject']);

