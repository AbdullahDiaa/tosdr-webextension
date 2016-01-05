'use strict';

var gulp = require('gulp'),
	zip = require('gulp-zip'),
	childProc = require('child_process');

gulp.task('default', function () {
	
	gulp.src('app/**')
	.pipe(zip('jid0-3GUEt1r69sQNSrca5p8kx9Ezc3U@jetpack.xpi'))
	.pipe(gulp.dest('dist'));
	
	childProc.exec('open -a "FirefoxNightly" dist/jid0-3GUEt1r69sQNSrca5p8kx9Ezc3U@jetpack.xpi');
});