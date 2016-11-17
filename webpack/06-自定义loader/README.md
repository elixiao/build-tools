## 自定义loader

先写建一个my-loader.js和my-file，我们打算用my-loader.js里面的逻辑来处理my-file的内容。
entry是入口文件，作用是将my-loader处理my-file的内容放在一个div中并添加在body里面。

```javascript
var content = require('!./my-loader!./my-file');
var div = document.createElement('div');
div.textContent = content;
document.body.appendChild(div);
```

我们在my-file里面写了如下内容：

```
var a = "hello";
var b = [1,2,3,4]
```

所谓的my-loader就是一个函数，接收my-file文件的内容，经过处理后返回。
这里暂时不做任何处理，原封不动返回。

```javascript
module.exports = function(source) {
    return source
}
```

然后运行webpack得到bundle.js如下：

```javascript
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var content = __webpack_require__(1);
	var div = document.createElement('div');
	div.textContent = content;
	document.body.appendChild(div);

/***/ },
/* 1 */
/***/ function(module, exports) {

	var a = "hello";
	var b = [1,2,3,4]

/***/ }
/******/ ]);
```

这是一个立即执行函数，是webpack自己写好了的，它接收一个数组作为参数。
我们发现这个数组有两个元素，都是函数，第一个元素的内容是entry的内容，
第二个元素的内容是my-file的内容。但第一个元素的内容多了一句话：

```javascript
var content = __webpack_require__(1);
```

这句话的意思是content来源于第一个元素的输出，我们来看看HTML显示的结果：

```
[object Object]
```

这是什么鬼？赶紧在entry.js里面加一句`console.log(content)`，再运行，此时控制台输出：

```
Object {}
```

不明白是啥意思。接下来修改了my-file文件，改成了：

```
module.exports = 'hello world'
```

再次运行发现控制台和页面都出现了hello world，再看bundle.js，它参数数组的第二个元素变成了

```
function(module, exports) {
	module.exports = 'hello world'
}
```

到这里发现其实my-loader把my-file里面的字符取出来全部放到了webpack参数数组的一个函数当中了，
而且这些字符就被当做js源码来处理的，而不是字符串处理的。不信，如果修改my-file内容为hello，
再运行会报错：

```bash
bundle.js:57 Uncaught ReferenceError: hello is not defined
```

bundle.js里面那个函数就变成了：

```
function(module, exports) {
	hello
}
```

如果将my-loader修改为：


```javascript
module.exports = function(source) {
    var a  =3
    return a
}
```

会报错：Final loader didn't return a Buffer or String.


到这里好像有点明白了：

1. loader必须返回一个Buffer或字符串
2. loader返回的字符串内容会被原封不动放在webpack的某个函数里

好，接下来开始真正写一个loader了，这个loader的作用是把my-file里面的内容价格中括号输出。
假设my-file里面还是hello，我们希望得到[hello]，代码如下：


```javascript
module.exports = function(source) {
    return "module.exports = '[" + source + "]'";
}
```

很轻松对不对？但事实上没那么简单，修改my-file，在hello下面添加一行，写world，运行发现报错：

```bash
ERROR in ./src/my-loader.js!./src/my-file
Module parse failed: /Users/lixiao/job/webstorm/build-tools/webpack/06-自定义loader/src/my-loader.js!/Users/lixiao/job/webstorm/build-tools/webpack/06-自定义loader/src/my-file Unterminated string constant (1:17)
You may need an appropriate loader to handle this file type.
SyntaxError: Unterminated string constant (1:17)
```

这是怎么回事呢？原来由于source带换行，my-loader执行之后返回的字符串是：


```bash
module.exports = '[hello 
	world]'
```

这个字符串又会被放在webpack函数里面当做代码处理，于是就报错了。
你不信把hello world写在同一行试试就没问题。
或者在hello后面加一个\也没问题。那怎么办呢？下面就是更好的解决办法：


```javascript
module.exports = function(source) {
    var str = "["+source.split('\n').join(' ')+"]"
    return "module.exports = "+JSON.stringify(str);
}
```
这样即使换行也没有关系了。下面总结一下：loader就是导出一个函数的node模块，
可以理解为一个小的编译器，将某些输入处理为浏览器可用的输出。

## 链式法则

上一个loader的处理结果可以给下一个loader，例如sass

```javascript
require("!style!css!sass!./file.scss");
```

或者在webpack.config.js里面写：

```javascript
loaders: [{
        test:/\.scss$/,
        loaders:["style","css","sass"]
}]
```

sass处理完之后给css-loader，css-loader处理完之后给style-loader，而loader之间的数据传递通过callback函数

```javascript
this.callback(null,source,map);
```

这样就可以传递给下一个loader了。

我们试试再创建一个loader叫做my-second-loader，其目的是把my-loader的处理结果加个大括号在外面，只需修改一点点即可：


```javascript
module.exports = function(source) {
    this.cacheable && this.cacheable();
    var str = "{"+source.split('\n').join(' ')+"}"
    return "module.exports = "+JSON.stringify(str);
}
```

再修改entry.js：

```javascript
var content = require('!./my-second-loader!./my-loader!./my-file');
```

运行发现结果竟然是：


```
{module.exports = "[hello not the world three yeah]"}
```

吓了一跳，感觉去bundle.js看看，发现函数里面的内容变为：

```javascript
module.exports = "{module.exports = \"[hello not the world    three   yeah]\"}"
```

原来my-second-loader把my-loader的导出作为source了，实际上这不是我想要的结果，修改my-loader为下面的：


```javascript
module.exports = function(source) {
    this.cacheable && this.cacheable();
    var str = "["+source.split('\n').join(' ')+"]"
    this.callback(null,str);
    return "module.exports = "+JSON.stringify(str);
}
```

this.callback这个才是传递给下一个loader的source，于是网页可以正常显示了。

## 缓存和异步

### 缓存

我们经常看到这种写法：


```javascript
module.exports = function(source) {
    this.cacheable && this.cacheable();
    var result = doSomething(source)
    return "module.exports = " + result ;
};
```

this.cacheable()的作用是让webpack利用缓存来提高效率。

### 异步

如果想让异步的操作不阻塞当前任务，使用下面的写法。

```javascript
module.exports = function(source) {
    var result = doSomething(source)
    var callback = this.async()
    doSomeAsyncOperation(content,function(err,result) {
        if(err) return callback(err);
        callback(null,result)
    })
    return "module.exports = " + result ;
};
```
