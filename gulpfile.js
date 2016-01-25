'use strict';

var argv = require('yargs').argv,
	gulp = require('gulp'),
	zip = require('gulp-zip'),
	childProc = require('child_process'),
	watcher = gulp.watch('app/**');
	
gulp.task('default', function () {
	watcher.on('change', function(event) {
		if(event.type === "changed"){
			console.log(event.path + " updated, Packaging XPI file...");

			gulp.src('app/**')
			.pipe(zip('jid0-3GUEt1r69sQNSrca5p8kx9Ezc3U@jetpack.xpi'))
			.pipe(gulp.dest('dist'));
			
			// Check for application in -app arg
			if(argv.app){
				// Open the Addon after packaging on OS X
				if(process.platform === "darwin"){
					childProc.exec('open -a "' + argv.app + '" dist/jid0-3GUEt1r69sQNSrca5p8kx9Ezc3U@jetpack.xpi', function () {
						console.log('Running XPI in ' + argv.app);
					});
				}
			}
			
		}		
	});
});

gulp.task('run', function () {
	// Check for application in -app arg
	if(argv.app){
		// Open the Addon after packaging on OS X
		if(process.platform === "darwin"){
			childProc.exec('open -a "' + argv.app + '" dist/jid0-3GUEt1r69sQNSrca5p8kx9Ezc3U@jetpack.xpi', function () {
				console.log('Running XPI in ' + argv.app);
				process.exit();
			});
		}
	}
});