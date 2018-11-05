const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    del = require('del'),
    inject = require('gulp-inject'),
    shell = require('gulp-shell'),
    series = require('stream-series'),
    uglifyCss = require('gulp-uglifycss'),
    htmlmin = require('gulp-htmlmin');

gulp.task('clean-up', () => {
    return del.sync(['dist/versioned']);
});

gulp.task('build-external-css', () => {
    return gulp
        .src([
            './dist/css/bootstrap.min.css',
            './dist/css/style.css',
            './dist/css/font-awesome.min.css',
            './dist/css/fontello.css',
            './dist/css/loaders.min.css'
        ])
        .pipe(concat('external-bundle.css'))
        .pipe(
            uglifyCss({
                uglyComments: true
            })
        )
        .pipe(rev())
        .pipe(gulp.dest('./dist/versioned'));
});

gulp.task('build-external-js', () => {
    return gulp
        .src([
            './dist/js/jquery.min.js',
            './dist/js/bootstrap.min.js',
            './dist/js/menumaker.js',
            './dist/js/jquery.sticky.js',
            './dist/js/sticky-header.js',
            './dist/js/jquery.easing.min.js',
            './dist/js/scrolling-nav.js',
            './dist/js/accordion.js',
            './dist/js/back-to-top.js',
            './dist/js/jquery.smooth-scroll.min.js',
            './dist/js/modernizr.js',
            './dist/js/jquery.isotope.min.js',
            './dist/js/filter-script.js',
            './dist/js/script.js'
        ])
        .pipe(concat('external-bundle.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/versioned'));
});

gulp.task('build-transactions-external-js', () => {
    return gulp
        .src([
            './dist/js/jquery.min.js',
            './dist/js/bootstrap.min.js',
            './dist/js/menumaker.js',
            './dist/js/jquery.sticky.js',
            './dist/js/sticky-header.js',
            './dist/js/jquery.easing.min.js',
            './dist/js/scrolling-nav.js',
            './dist/js/accordion.js',
            './dist/js/back-to-top.js',
            './dist/js/jquery.smooth-scroll.min.js',
            './dist/js/modernizr.js',
            './dist/js/jquery.isotope.min.js',
            './dist/js/filter-script.js',
            './dist/js/script.js',
            './dist/js/transactions.js'
        ])
        .pipe(concat('transactions-external-bundle.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/versioned'));
});

gulp.task('build-boss-external-js', () => {
    return gulp
        .src([
            './dist/js/jquery.min.js',
            './dist/js/bootstrap.min.js',
            './dist/js/menumaker.js',
            './dist/js/jquery.sticky.js',
            './dist/js/sticky-header.js',
            './dist/js/jquery.easing.min.js',
            './dist/js/scrolling-nav.js',
            './dist/js/accordion.js',
            './dist/js/back-to-top.js',
            './dist/js/jquery.smooth-scroll.min.js',
            './dist/js/modernizr.js',
            './dist/js/jquery.isotope.min.js',
            './dist/js/filter-script.js',
            './dist/js/script.js',
            './dist/js/boss.js'
        ])
        .pipe(concat('boss-external-bundle.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/versioned'));
});

gulp.task('version-webpack-bundle', () => {
    return gulp
        .src('./dist/js/bundle.js')
        .pipe(rev())
        .pipe(gulp.dest('./dist/versioned'));
});

gulp.task(
    'html-inject',
    ['build-external-css', 'build-external-js', 'version-webpack-bundle'],
    () => {
        return gulp
            .src('./dist/index.html')
            .pipe(
                inject(
                    gulp.src(
                        [
                            'dist/versioned/external-*.css',
                            'dist/versioned/external-*.js',
                            'dist/versioned/bundle-*.js'
                        ],
                        {read: false}
                    ),
                    {
                        addRootSlash: true,
                        // addPrefix: 'https://malaysia-6d6d.kxcdn.com',
                        ignorePath: ['dist']
                    }
                )
            )
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist'));
    }
);

gulp.task(
    'general-pages-inject',
    ['build-external-css', 'build-external-js'],
    () => {
        return gulp
            .src([
                './dist/about.html',
                './dist/privacy-policy.html',
                './dist/terms-of-use.html',
                './dist/payment-status-ok.html',
                './dist/payment-status-nok.html',
                './dist/my-account.html'
            ])
            .pipe(
                inject(
                    gulp.src(
                        [
                            'dist/versioned/external-*.css',
                            'dist/versioned/external-*.js'
                        ],
                        {read: false}
                    ),
                    {
                        addRootSlash: true,
                        // addPrefix: 'https://malaysia-6d6d.kxcdn.com',
                        ignorePath: ['dist']
                    }
                )
            )
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist'));
    }
);

gulp.task(
    'transactions-inject',
    ['build-external-css', 'build-transactions-external-js'],
    () => {
        return gulp
            .src(['./dist/my-account/transactions.html'])
            .pipe(
                inject(
                    gulp.src(
                        [
                            'dist/versioned/external-*.css',
                            'dist/versioned/transactions-external-*.js'
                        ],
                        {read: false}
                    ),
                    {
                        addRootSlash: true,
                        // addPrefix: 'https://malaysia-6d6d.kxcdn.com',
                        ignorePath: ['dist']
                    }
                )
            )
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist/my-account'));
    }
);

gulp.task(
    'boss-inject',
    ['build-external-css', 'build-boss-external-js'],
    () => {
        return gulp
            .src(['./dist/boss/index.html'])
            .pipe(
                inject(
                    gulp.src(
                        [
                            'dist/versioned/external-*.css',
                            'dist/versioned/boss-external-*.js'
                        ],
                        {read: false}
                    ),
                    {
                        addRootSlash: true,
                        // addPrefix: 'https://malaysia-6d6d.kxcdn.com',
                        ignorePath: ['dist']
                    }
                )
            )
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist/boss'));
    }
);

gulp.task('build', [
    'general-pages-inject',
    'html-inject',
    'transactions-inject',
    'boss-inject'
]);
