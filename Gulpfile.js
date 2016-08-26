var gulp = require('gulp'),
  connect = require('gulp-connect'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  inject = require('gulp-inject'),
  wiredep = require('wiredep').stream,
  gulpif = require('gulp-if'),
  minifyCss = require('gulp-minify-css'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify'),
  angularFilesort = require('gulp-angular-filesort'),
  templateCache = require('gulp-angular-templatecache'),
  sass = require('gulp-sass'),
  sassGlob = require('gulp-sass-glob'),
  jscs = require('gulp-jscs'),
  rename = require('gulp-rename'),
  git = require('gulp-git'),
  removeNewline = require('newline-remove'),
  chug = require('gulp-chug'),
  runSequence = require('run-sequence'),
  nodemon = require('gulp-nodemon'),
  lazypipe = require('lazypipe'),
  sourcemaps = require('gulp-sourcemaps'),
  debug = require('gulp-debug'),
  ngAnnotate = require('gulp-ng-annotate'),

  uglifyMap = lazypipe()
  .pipe(sourcemaps.init)
  .pipe(uglify)
  .pipe(sourcemaps.write),

  minifyMap = lazypipe()
  .pipe(sourcemaps.init)
  .pipe(minifyCss)
  .pipe(sourcemaps.write),

  src = './client',
  dist = './public/admin',

  paths = {
    indexFile: src + '/index.html',
    js: src + '/app/**/*.js',
    scss: {
      main: src + '/assets/sass/main.scss',
      partial: src + '/assets/sass/**/*.scss',
      modules: src + '/app/**/*.scss'
    },
    html: src + '/**/*.html',
    tpl: src + '/app/**/*.html',
    mainScssFile: src + '/assets/sass/main.scss',
    tmp: src + '/tmp',
    bower: src + '/lib',
    vendors: src + '/vendor',
    img: src + '/assets/images',
    dat: src + '/data'
  };

gulp.task('server', function() {
  nodemon({
    exec: 'node --debug',
    ext: 'js',
    ignore: ['.idea/*', 'node_modules/*', 'public/*', 'widget/*', '.git/*', src + '/*'],
    script: 'index.js',
    verbose: true
  });
});

gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint(src + '/.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', function() {
  return gulp.src(paths.js)
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
});

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(connect.reload());
});

gulp.task('css', function() {
  return gulp.src(paths.mainScssFile)
    .pipe(sassGlob())
    .pipe(sass().on('error', function(error) {
      console.log(error);
    }))
    .pipe(gulp.dest(paths.tmp + '/css'));
});

gulp.task('inject', function() {
  return gulp.src('index.html', {
      cwd: src
    })
    .pipe(inject(
      gulp.src([paths.js, paths.tmp + '/scripts/*.js']).pipe(angularFilesort()), {
        read: false,
        ignorePath: '/client'
      }))
    .pipe(inject(
      gulp.src([src + '/css/**/*.css']), {
        read: false,
        ignorePath: '/client'
      }
    ))
    .pipe(gulp.dest(src));
});

gulp.task('wiredep', function() {
  gulp.src(paths.indexFile)
    .pipe(wiredep({
      directory: paths.bower,
      exclude: [paths.bower + '/PACE/pace.js']
    }))
    .pipe(gulp.dest(src));
});

gulp.task('templates', function() {
  gulp.src(paths.tpl)
    .pipe(templateCache({
      root: 'app/',
      module: 'app'
    }))
    .pipe(gulp.dest(paths.tmp + '/scripts'));
});

gulp.task('compress', ['temps'], function() {
  gulp.src(paths.indexFile)
    .pipe(useref.assets())
    .pipe(gulpif('*.js', ngAnnotate()))
    .pipe(gulpif('*.js', uglifyMap()))
    .pipe(gulpif('*.css', minifyMap()))
    .pipe(rename(function(path) {
      path.dirname = path.dirname.replace('static/admin/', '');
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('copy', function() {
  gulp.src(paths.indexFile)
    .pipe(useref())
    .pipe(gulp.dest(dist));
  gulp.src(paths.bower + '/font-awesome/fonts/**')
    .pipe(gulp.dest(dist + '/fonts'));
  gulp.src(paths.img + '/**/*')
    .pipe(gulp.dest(dist + '/images'));
  gulp.src(paths.vendors + '/fonts/**/*')
    .pipe(gulp.dest(dist + '/fonts'));
  gulp.src(paths.dat + '/*')
    .pipe(gulp.dest(dist + '/data'));
  gulp.src(paths.bower + '/PACE/pace.js')
    .pipe(gulp.dest(dist + /js/));
});

gulp.task('watch', function() {
  gulp.watch([paths.tpl], ['html', 'templates', 'compress']);
  gulp.watch([paths.scss.main, paths.scss.modules, paths.scss.partial], ['css', 'inject', 'compress']);
  gulp.watch([paths.js], ['build']);
  gulp.watch(['./bower.json'], ['wiredep']);
});

gulp.task('temps', ['templates', 'css', 'inject']);

gulp.task('dev', function() {
  runSequence('temps', 'wiredep', ['compress', 'copy', 'watch', 'server']);
});

gulp.task('front', function() {
  runSequence('temps', 'wiredep', ['compress', 'copy', 'watch']);
});

gulp.task('build', ['temps', 'wiredep', 'compress', 'copy']);
gulp.task('default', ['build']);
