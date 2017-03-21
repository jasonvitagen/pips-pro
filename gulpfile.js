const
    gulp = require('gulp')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify')
    , rev = require('gulp-rev')
    , del = require('del')
    , inject = require('gulp-inject')
    , shell = require('gulp-shell')
    , series = require('stream-series')
    , uglifyCss = require('gulp-uglifycss')
    , htmlmin = require('gulp-htmlmin');

gulp.task('clean-up', () => {
    return del.sync([
        'public/versioned'
    ]);
});

gulp.task('build-external-css', () => {
    return gulp.src([
        './public/css/bootstrap.min.css',
        './public/css/style.css',
        './public/css/font-awesome.min.css',
        './public/css/fontello.css',
        './public/css/loaders.min.css',
        ])
        .pipe(concat('external-bundle.css'))
        .pipe(uglifyCss({
            "uglyComments": true
        }))
        .pipe(rev())
        .pipe(gulp.dest('./public/versioned'));
});

gulp.task('build-external-js', () => {
    return gulp.src([
        './public/js/jquery.min.js',
        './public/js/bootstrap.min.js',
        './public/js/menumaker.js',
        './public/js/jquery.sticky.js',
        './public/js/sticky-header.js',
        './public/js/jquery.easing.min.js',
        './public/js/scrolling-nav.js',
        './public/js/accordion.js',
        './public/js/back-to-top.js',
        './public/js/jquery.smooth-scroll.min.js',
        './public/js/modernizr.js',
        './public/js/jquery.isotope.min.js',
        './public/js/filter-script.js',
        './public/js/script.js'])
        .pipe(concat('external-bundle.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./public/versioned'));
});

gulp.task('build-transactions-external-js', () => {
    return gulp.src([
        './public/js/jquery.min.js',
        './public/js/bootstrap.min.js',
        './public/js/menumaker.js',
        './public/js/jquery.sticky.js',
        './public/js/sticky-header.js',
        './public/js/jquery.easing.min.js',
        './public/js/scrolling-nav.js',
        './public/js/accordion.js',
        './public/js/back-to-top.js',
        './public/js/jquery.smooth-scroll.min.js',
        './public/js/modernizr.js',
        './public/js/jquery.isotope.min.js',
        './public/js/filter-script.js',
        './public/js/script.js',
        './public/my-account/transactions.js'])
        .pipe(concat('transactions-external-bundle.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./public/versioned'));
});

gulp.task('version-webpack-bundle', () => {
    return gulp.src('./public/js/bundle.js')
        .pipe(rev())
        .pipe(gulp.dest('./public/versioned'));
});

gulp.task('html-inject', ['build-external-css', 'build-external-js', 'version-webpack-bundle'], () => {
    return gulp.src('./public/index.html')
        .pipe(inject(gulp.src([
            'public/versioned/external-*.css',
            'public/versioned/external-*.js',
            'public/versioned/bundle-*.js',
        ], {read: false}), {
            addRootSlash: false,
            addPrefix: 'https://malaysia-6d6d.kxcdn.com',
            ignorePath: ['public']
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('public'))
});

gulp.task('general-pages-inject', ['build-external-css', 'build-external-js'], () => {
    return gulp.src([
            './public/about.html',
            './public/privacy-policy.html',
            './public/terms-of-use.html',
            './public/payment-status-ok.html',
            './public/payment-status-nok.html',
            './public/my-account.html'
        ])
        .pipe(inject(gulp.src([
            'public/versioned/external-*.css',
            'public/versioned/external-*.js'
        ], {read: false}), {
            addRootSlash: false,
            addPrefix: 'https://malaysia-6d6d.kxcdn.com',
            ignorePath: ['public']
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('public'));
});

gulp.task('transactions-inject', ['build-external-css', 'build-transactions-external-js'], () => {
    return gulp.src([
            './public/my-account/transactions.html',
        ])
        .pipe(inject(gulp.src([
            'public/versioned/external-*.css',
            'public/versioned/transactions-external-*.js'
        ], {read: false}), {
            addRootSlash: false,
            addPrefix: 'https://malaysia-6d6d.kxcdn.com',
            ignorePath: ['public']
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('public/my-account'));
});

gulp.task('build', ['general-pages-inject', 'html-inject', 'transactions-inject']);

