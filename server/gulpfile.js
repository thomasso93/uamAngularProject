var gulp = require('gulp');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var gp_concat = require('gulp-concat');
var gp_rename = require('gulp-rename');
var gp_uglify = require('gulp-uglify');

var filesToMove = [
        './scripts/**/*',
        './css/*',
        './views/*',
        './page.html'
    ];


var filesToMove2 = [
        './scripts/lib/*',
        './scripts/services/*',
        './scripts/*',
        './css/*',
        './views/*',
        './page.html'
 ];
 
gulp.task('index', function () {
  var target = gulp.src('page.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./scripts/lib/angular.min.js','./scripts/lib/*.js', './scripts/*.js','./scripts/services/*.js','./scripts/controllers/*.js','./css/*.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});

gulp.task('index2', ['concat'], function () {
  var target = gulp.src('./build/page.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./build/scripts/lib/angular.min.js','./build/scripts/lib/*.js', './build/scripts/*.js','./build/scripts/services/*.js','./build/scripts/controllers/concat.js','./build/css/*.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./build'));
});


gulp.task('js-fef', function(){
    return gulp.src(['./scripts/controllers/*.js'])
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'))
        .pipe(gp_concat('concat.js'))
        .pipe(gulp.dest('./build/scripts/controllers'))
        .pipe(gp_rename('uglify.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./build/scripts/controllers'));
});

gulp.task('build:dev', function(){
  gulp.src(filesToMove, { base: './' })
  .pipe(gulp.dest('build'));
});

gulp.task('concat', ['js-fef'], function(){  });

gulp.task('move2', function(){
  gulp.src(filesToMove2, { base: './' })
  .pipe(gulp.dest('build'));
});


gulp.task('build:prod', ['move2','index2']);


