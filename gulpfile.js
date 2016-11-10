// 引入 gulp
var gulp = require('gulp');

// 引入组件
var imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'),//css压缩
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename');//文件更名

// 压缩图片
gulp.task('img', function() {
    return gulp.src('public/images/*/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('public/min/images/'));
});

// 合并、压缩、重命名css
gulp.task('css', function() {
    return gulp.src('public/styles/*.css')
        .pipe(rename({ suffix: '' }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/min/styles'));
});

// 合并、压缩js文件
gulp.task('js', function() {
    return gulp.src('public/scripts/*.js')
        .pipe(rename({ suffix: '' }))
        .pipe(uglify())
        .pipe(gulp.dest('public/min/scripts'));
});

// 默认任务
gulp.task('default', function(){
    //gulp.start('js','css','img');
    gulp.start('js','css');
});