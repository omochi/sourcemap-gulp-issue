# About this repo

This repository is minimum reproduction code of issue I met and describe below.

I reported issue at this place.

- https://github.com/evanw/node-source-map-support/issues/112

# Issue

The stacktrace of this repo via simple gulp task in below is wrong for some reason.

```
gulp.task("default", function() {
	return gulp
		.src([ "test.js" ])
		.pipe($.mocha());
});
```

Result.

```
$ gulp 
...
Trace
    at foo (/Users/omochi/work/github/omochi/sourcemap-gulp-issue/app.js:6:10)
    at Context.<anonymous> (/Users/omochi/work/github/omochi/sourcemap-gulp-issue/test.js:8:3)
    at callFn (/Users/omochi/work/github/omochi/sourcemap-gulp-issue/node_modules/gulp-mocha/node_modules/mocha/lib/runnable.js:286:21)
...
```

In app.js, `console.trace();` is written at line 4.
So the result is wrong.

But running of same test is correct via such command line in below.

```
$ mocha test.js
```

Result.

```
  FooTest
Trace
    at foo (/Users/omochi/work/github/omochi/sourcemap-gulp-issue/app.js:4:10)
    at Context.<anonymous> (/Users/omochi/work/github/omochi/sourcemap-gulp-issue/test.js:6:3)
    at callFn (/Users/omochi/.nvm/versions/node/v4.2.1/lib/node_modules/mocha/lib/runnable.js:286:21)
    ...
```

# reproduction conditions

I found the conditions of this issue.

- Calling `require("source-map-support").install();` at first line in app.js. If remove this line, it fix issue.
- Using `gulpfile.babel.js`. If rename it to `gulpfile.js`, it fix issue.
- `babel-core` is installed. If `npm remove babel-core`, it fix issue. But, warning message in below is emitted when gulp task started.

```
$ gulp
[13:40:10] Failed to load external module babel-core/register
[13:40:10] Failed to load external module babel/register
[13:40:10] Using gulpfile ~/work/github/omochi/sourcemap-gulp-issue/gulpfile.babel.js
...
```

I guess that `source-map-support` and `babel-core/register` which is loaded by gulp because of its file extension `.babel.js` are conflicted each other.

# supplement

It looks like no make sence of using `source-map-support` without any sourcemap file.
But this repo is shrinked minimal example.
My original project is more large and actully using sourcemap.

So I can not avoid all of condition write above.

