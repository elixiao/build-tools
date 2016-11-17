## 四大天王


### gulp.task(name[, deps], fn)

任务的入口，最基本的命令：

```javascript
gulp.task('task-name', function() {
    // 任务逻辑
});
```


### gulp.src(globs[, options])

创建一个read任务，读取同目录下的file文件：

```javascript
gulp.task('read', function() {
    gulp.src('./file') 
});
```



### gulp.dest(path[, options])

创建一个read任务，读取同目录下的file文件，并输出到指定目录下：

```javascript
gulp.task('readWrite', function() {
    gulp.src('./file')
        .pipe(gulp.dest('./path'));
});
```

### gulp.watch(glob[, opts, cb])

创建一个监听指定文件变动的任务：

```javascript
gulp.task('watch',function () {
    gulp.watch('file', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ' at ' + new Date());
    });
})
```
运行之后每当该文件发生变化就会触发watch任务执行回调。

```bash
$ gulp watch
[20:39:06] Using gulpfile ~/job/webstorm/build-tools/gulp/02-四大天王/gulpfile.js
[20:39:06] Starting 'watch'...
[20:39:06] Finished 'watch' after 11 ms
File /Users/lixiao/build-tools/gulp/02-四大天王/file was changed at Wed Nov 16 2016 20:39:17 GMT+0800 (CST)
File /Users/lixiao/build-tools/gulp/02-四大天王/file was deleted at Wed Nov 16 2016 20:39:22 GMT+0800 (CST)
File /Users/lixiao/build-tools/gulp/02-四大天王/file was added at Wed Nov 16 2016 20:39:30 GMT+0800 (CST)
```



```javascript

```


```javascript

```