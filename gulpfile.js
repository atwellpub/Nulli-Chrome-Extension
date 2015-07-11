var gulp       = require('gulp'),
	prettify     = require('gulp-js-prettify');
 
// Gulp plumber error handler
var onError = function(err) {
	console.log(err);
}


// Lets us type "gulp" on the command line and run all of our tasks
gulp.task('default', ['clean']);
 
// Combine/Minify/Clean Javascript files
gulp.task('clean', function() {
	return gulp.src('./src/**/*.js')
		.pipe(prettify({collapseWhitespace: false}))
		.pipe(gulp.dest('./src'))
});
 