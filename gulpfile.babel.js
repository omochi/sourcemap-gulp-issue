"use strict";

var gulp = require("gulp");
var gulpLoadPlugins = require("gulp-load-plugins");
var $ = gulpLoadPlugins();

gulp.task("default", function() {
	return gulp
		.src([ "test.js" ])
		.pipe($.mocha());
});