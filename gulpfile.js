var gulp = require('gulp'),
	browserSync= require('browser-sync').create(),
	uglify= require('gulp-uglify'),    
	useref = require('gulp-useref'),
	gulpif = require('gulp-if');


gulp.task('html',function(){
	gulp.src('src/index.html')
		.pipe(useref())
		.pipe(gulpif('*.js',uglify()))
		.pipe(gulp.dest('dist'));
});	

/*gulp.task('scripts',function(){
	gulp.src(['src/js/map.js','src/js/app.js'])
		.pipe(concat('all.js'))
		.pipe(uglify().on('error', function(e){
            console.log(e);
         }))
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('dist/js/'));
});
*/
//  add any files to reload
// ============================================

// js-watch reloads the browser with js changes
gulp.task('js-watch',['scripts'],function(){
	browserSync.reload();
});

// waits for copy task to finish
gulp.task('html-watch',['html'],function(){
	browserSync.reload();
});
// ===========================================

// running the server
// ===========================================
gulp.task('serve',function(){
	browserSync.init({
        server: "./src"
    });
// =========================================

// watch for files
// ==========================================
// if html files changes copy task is called
gulp.watch('src/*.html',['html-watch']);
//watch js files and calls js-watch
gulp.watch('src/js/*.js',['js-watch']);
// =======================================
// gulp.watch('src/js/*.js').on('change', browserSync.reload);

});

gulp.task('default',['serve','html']);