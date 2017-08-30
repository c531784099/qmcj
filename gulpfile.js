/**
 * Created by Administrator on 2017/8/2 0002.
 */
var gulp=require("gulp"),
    uglify=require("gulp-uglify"),
    rename=require("gulp-rename"),
    concat=require('gulp-concat'),
    cssmin=require('gulp-clean-css'),
    htmlmin=require('gulp-htmlmin');
//js concat uglify rename
gulp.task("jsmin",function(){
    gulp.src(["src/js/*.js",'src/js/controller/*.js',"src/js/server/*.js"])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix:".min"
        }))
        .pipe(gulp.dest("dist/js"));
})

//css clean concat rename
gulp.task('cssmin',function(){
    gulp.src('src/css/*.css')
        .pipe(concat('all.css'))
        .pipe(cssmin())
        .pipe(rename({
            suffix:".min"
        }))
        .pipe(gulp.dest('dist/css'))
})
//html min
gulp.task('indexhtmlmin',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
})
gulp.task("viewshtmlmin",function(){
    gulp.src("src/views/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("dist/views"))
})
gulp.task("viewsUserHtmlmin",function(){
    gulp.src("src/views/user-info/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("dist/views/user-info"))
})
gulp.task("libcopy",function(){
    gulp.src("src/lib/**")
        .pipe(gulp.dest('dist/lib'))
})
gulp.task("imgcopy",function(){
    gulp.src("src/images/**")
        .pipe(gulp.dest("dist/images"))
})
//静态服务器配置
gulp.task("default",["jsmin","cssmin","indexhtmlmin","viewshtmlmin","libcopy","imgcopy","viewsUserHtmlmin"]);