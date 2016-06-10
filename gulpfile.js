var gulp = require('gulp'),
	browserSync= require('browser-sync').create();

gulp.task('serve',function(){
	browserSync.init({
        server: "./dist"
    });

    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('copy',function(){
		gulp.src('src/*.html')
			.pipe(gulp.dest('dist/'));
});

gulp.task('watch',function(){
	gulp.watch('src/*.html',['copy']);
});
gulp.task('default',['watch','serve']);