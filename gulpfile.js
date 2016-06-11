var gulp = require('gulp'),
	browserSync= require('browser-sync').create();

gulp.task('serve',function(){
	browserSync.init({
        server: "./src"
    });
//watch index file
    // gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('copy',function(){
		gulp.src('src/*.html')
			.pipe(gulp.dest('dist/'));
});

// js-watch reloads the browser with js changes

gulp.task('js-watch',browserSync.reload);
gulp.task('html-watch',['copy'],browserSync.reload);

gulp.task('watch',function(){
// if html files changes copy task is called
	gulp.watch('src/*.html',['html-watch']);
//watch js files and calls js-watch
	gulp.watch('src/js/*.js',['js-watch']);
});


gulp.task('default',['watch','serve','copy']);