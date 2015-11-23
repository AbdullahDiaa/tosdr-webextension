'use strict';

var gulp = require('gulp'),
	zip = require('gulp-zip'),
	watch = require('gulp-watch');


gulp.task('xpi', function () {
	return gulp.src('app/**')
	.pipe(zip('jid0-3GUEt1r69sQNSrca5p8kx9Ezc3U@jetpack.xpi'))
	.pipe(gulp.dest('dist'));
});
	
gulp.task('default', function () {
	gulp.watch('app/*', ['xpi']);
});