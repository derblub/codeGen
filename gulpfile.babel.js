'use strict';

/* Load modules & packages */

import gulp             from    'gulp';
import gulpAddSrc       from    'gulp-add-src';
import autoprefixer     from    'gulp-autoprefixer';
import cached           from    'gulp-cached';
import changed          from    'gulp-changed';
import deleted          from    'gulp-deleted';
import imagemin         from    'gulp-imagemin';
import plumber          from    'gulp-plumber';
import sass             from    'gulp-sass';
import stream           from    'stream';
import gutil            from    'gulp-util';
import del              from    'del'; //Coming with gulp
import htmlmin          from    'gulp-htmlmin';
import babel            from    'gulp-babel';

import source           from    'vinyl-source-stream';
import buffer           from    'vinyl-buffer';
import browserify       from    'browserify';
import babelify         from    'babelify';
import uglify           from    'gulp-uglify';
import browserSync      from    'browser-sync';

/* Constants  */

// const reload = browserSync.reload;

/* Directories of the project */
const paths = {
  src: 'src',
  dist: 'dist'
};

const scssPaths = {
  src: `${paths.src}/scss/application.scss`,
  dist: `${paths.dist}/css/`
};

const assets = {
    srcImg: `${paths.src}/img/**/*`,
    distImg: `${paths.dist}/img`,
    srcJs: `${paths.src}/js/main.js`,
    disJs: `${paths.dist}/js/`,
}

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
       baseDir: "./dist"
    }
  });
})

/*
    Minify html
    --------
*/

gulp.task('engine:html', () => {
    return gulp.src(paths.src + '/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.dist + '/'))
        .on('end', () => {
            gutil.log(gutil.colors.yellow('Finished engine:html'));
        })
})

/*
    Styles tasks
    --------
    Compile Sass -> Compressed & ErrorLog
    Prefix eveyrthing
    Css in dest folder
    Log when it's done
*/

gulp.task('engine:styles', () => {
    return gulp.src(scssPaths.src)
        .pipe(plumber(function(error) {
                // Output an error message
                gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
                // emit the end event, to properly end the task
                this.emit('end');
            })
        )
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
                browsers: ['last 2 versions', '> 5%', 'ie >= 9', 'Firefox ESR'],
                cascade: false
            })
        )
        .pipe(gulp.dest(scssPaths.dist))
        .pipe(browserSync.reload({
          stream: true
        }))
        .on('end', () => {
            gutil.log(gutil.colors.yellow('Finished engine:styles'));
        })
})


/*
    Process images
    --------
    Check if file(s) are deleted -> Deleted the from the dest folder
    Check if image(s) changed -> Only process those one
    Copy eveyrthing to the dest folder
    Log when it's done
*/

gulp.task('engine:images', () =>{
    return gulp.src(paths.src + '/img/*')
        .pipe(deleted(assets.distImg, ["**/*"]))
        .pipe(changed(assets.distImg))
        .pipe(imagemin())
		    .pipe(gulp.dest(assets.distImg))
        .on('end', () => {
            gutil.log(gutil.colors.yellow('Finished engine:images'));
        })
})

/*
    Process fonts (basically a copy paste)
*/
gulp.task('engine:fonts', () => {
   gulp.src('./src/fonts/*')
   .pipe(gulp.dest('./dist/fonts'));
});

/*
    Process Javascript
*/

gulp.task('engine:js', () => {
    browserify(assets.srcJs)
        .transform(babelify, {presets: ['es2015']})
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .on('error', (err) => {
            console.error(err); this.emit('end');
        })
        .on('end', () => {
            gutil.log(gutil.colors.yellow('Finished engine:js'));
        })
});


/* UTILS */
/*
    Clean
    --------
    Clean dist directory before build
*/

gulp.task('utils:clean', () => {
    del.sync([paths.dist+'/*'], {force: true});
    gutil.log(gutil.colors.yellow('Clean ' + paths.dist+ '/*' + ' directory!'));
})


/*
    Watch & Default
*/
gulp.task('watch', () => {
    gulp.watch(assets.srcImg,['engine:images']);
    gulp.watch('./src/scss/**/*.scss',['engine:styles']);
    gulp.watch('./src/js/*.js',['engine:js']);
    gulp.watch('./src/*.html',['engine:html']);
})

gulp.task('default',['browser-sync','engine:html', 'engine:styles', 'engine:js', 'engine:images', 'engine:fonts', 'watch'], () => {
  gutil.log(gutil.colors.yellow('You can work now!'));
})


/*
    Build engine
    --------
*/

gulp.task('init-build', () => {
    gutil.log(gutil.colors.red('Build starting'));
})


gulp.task('build', ['init-build','utils:clean','engine:html','engine:styles','engine:js','engine:images', 'engine:fonts'], () => {
    gutil.log(gutil.colors.green('Congrats build finished!'));
})
