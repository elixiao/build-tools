var gulp = require('gulp');

gulp.task('default', function() {
    // 将你的默认的任务代码放在这，在命令行切换到本目录并输入gulp
    console.log('默认的任务')
});

gulp.task('sayHello', function() {
    // 有名称的任务，在命令行切换到本目录并输入gulp sayHello
    console.log('Hello!')
});