var gulp = require('gulp'),
	browserSync= require('browser-sync').create();


gulp.task('copy',function(){
		gulp.src('src/*.html')
			.pipe(gulp.dest('dist/'));
});


//  add any files to reload
// ============================================

// js-watch reloads the browser with js changes
gulp.task('js-watch',function(){
	browserSync.reload();
});

// waits for copy task to finish
gulp.task('html-watch',['copy'],function(){
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

gulp.task('default',['serve']);