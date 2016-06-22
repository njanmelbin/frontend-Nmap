var gulp = require('gulp'),
	browserSync= require('browser-sync').create(),
	uglify= require('gulp-uglify'),    
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	eslint = require('gulp-eslint');

gulp.task('scripts',function(){
	gulp.src('src/index.html')
		.pipe(useref())
		.pipe(gulpif('*.js',uglify()).on('error',console.error.bind(console)))
		.pipe(gulp.dest('dist'));
});	

gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
   return gulp.src(['src/*.js'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
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
gulp.task('html-watch',function(){
	browserSync.reload();
});
// ===========================================

// running the server
// ===========================================
gulp.task('serve',function(){
	browserSync.init({
        server: {
        		baseDir :"src",
        		routes:{
        			"/bower_components" : "bower_components"
        		}
        }
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

gulp.task('default',['serve','scripts']);