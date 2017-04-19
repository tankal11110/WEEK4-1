var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var runSequence = require("run-sequence");
var del = require('del');
gulp.task('css', function(){
	
	return gulp.src('sass/**/*.scss')
			.pipe(sass.sync().on('error', sass.logError))
			.pipe(autoprefixer({
            	browsers: ["last 5 version", "IE 9"]
        	}))
			.pipe(gulp.dest("css"));

});

gulp.task( 'server', function(){

	browserSync.init({
		server: './'
	});

});

gulp.task('watch', function(){

	gulp.watch("sass/**/*.scss", ["css"]);
	gulp.watch("./*.html", browserSync.reload);
});

gulp.task("concatJS", function(){

	gulp.src("./*html")
		.pipe( useref() )
		.pipe( gulp.dest("dist/") );
});

gulp.task("minJS", function(){

	console.log("minJS");

	return gulp.src("dist/js1/*js")
		.pipe( uglify() ) 
		.pipe(gulp.dest("dist/js"));

});

gulp.task('clean' , function(){

	return del("dist/");
});

gulp.task('clean_js1' , function(){
	
	return del("dist/js1");

});


gulp.task("copy", function(){

	
	return gulp.src(["css/**/*.css", "images", "uploads/*"], {
		base: "./"
	})
	.pipe(gulp.dest("dist/"));

});

gulp.task("build", function(cb){

	runSequence("clean" , "concatJS", "minJS", "clean_js1", "copy", cb);

});


gulp.task("build:server", ["build"], function(){

	browserSync.init({
		server: "dist/"
	});

});

gulp.task("default", ["css", "server", "watch"]);