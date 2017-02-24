var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');
var react = require('gulp-react');

// чтобы запустить эту задачу, наберите в командной строке gulp jade
gulp.task('jade', function() {
return gulp.src('jade/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
     stream: true
}))
});


gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 


gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
  })
})


gulp.task('react', function () {
    return gulp.src('appjs/app.js')
        .pipe(react())
        .pipe(gulp.dest('js'));
});


gulp.task('watch', ['browserSync', 'react', 'jade', 'sass'], function (){
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('jade/****/***/**/*.jade', ['jade']);
  gulp.watch('appjs/*.js', ['react']);
  // Обновляем браузер при любых изменениях в HTML или JS
  gulp.watch('sass/**/*.scss', browserSync.reload);
  gulp.watch('jade/****/***/**/*.jade', browserSync.reload);

  
});




