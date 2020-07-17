const { series, parallel } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const fileinclude = require('gulp-file-include');
const autoprefixer = require('gulp-autoprefixer');
const uglifycss = require('gulp-uglifycss');
const rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const del = require('del');

const theme_name = 'theme';

function clean() {
    return del(`../${theme_name}/**`, {force:true});
}

function scss() {
    return gulp.src('./scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`../${theme_name}`));
}

function php() {
    return gulp.src('./php/**/*.php')
        .pipe(gulp.dest(`../${theme_name}`));
}

function js() {
    return gulp.src('./js/usr/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`../${theme_name}/js`));
}
  
exports.default = series(clean, php, scss, js);

/* What I need 

1. Watch SCSS folder, process all files (compose & autoprefix) to a CSS folder
2. Watch JS folder and process files - compose to one file, process ES6
3. Watch the vendor folder and move the files to corresponding folder in the dist package
4. Watch the images and move the image files to the dist folder
5. Watch and move the php files 


*/