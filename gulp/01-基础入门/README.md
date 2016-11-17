## 基础入门

```javascript
var gulp = require('gulp');

gulp.task('default', function() {
    // 将你的默认的任务代码放在这，在命令行切换到本目录并输入gulp
    console.log('默认的任务')
});
```

输出结果是：

```
$ gulp
[20:18:17] Using gulpfile ~/build-tools/gulp/01-基础入门/gulpfile.js
[20:18:17] Starting 'default'...
默认的任务
[20:18:17] Finished 'default' after 128 μs
```

gulp就意味着执行gulpfile定义的default任务。当然，你可以为任务起任意名字，例如：

```javascript
var gulp = require('gulp');

gulp.task('sayHello', function() {
    // 有名称的任务，在命令行切换到本目录并输入gulp sayHello
    console.log('Hello!')
});
```

这个时候在命令行就要输入`gulp sayHello`了