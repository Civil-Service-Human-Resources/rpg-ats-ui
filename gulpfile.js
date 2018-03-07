const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const argv = require('yargs').argv;

const SASS_SRC = './src/sass/**/*.scss';
const CSS_DEST = './dist/css';
const CSS_MAPS_DEST = './maps';
const CSS_FILENAME = argv.production ? 'cand-default.min.css' : 'cand-default.css';

gulp.task('sass', () => {
    const sassConfig = {
        outputStyle: argv.production ? 'compressed' : 'expanded'
    };

    return gulp.src(SASS_SRC)
        .pipe(sourcemaps.init())
        .pipe(sass(sassConfig).on('error', sass.logError))
        .pipe(sourcemaps.write(CSS_MAPS_DEST))
        .pipe(rename(CSS_FILENAME))
        .pipe(gulp.dest(CSS_DEST))
});

gulp.task('sass:watch', () =>
    gulp.watch(SASS_SRC, ['sass'])
);

gulp.task('sass:dev', ['sass', 'sass:watch']);