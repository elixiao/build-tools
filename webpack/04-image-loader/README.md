## 加载图片

webpack不仅能加载CSS还能加载资源文件，例如图片等，当然也需要相应的模块加载器：

```
npm install file-loader url-loader --save-dev
```

配置文件如下：

```
module.exports = {
    entry:'./src/entry.js',
    output:{
        path:'./dist',
        filename:'bundle.js'
    },
    module: {
        loaders:[
            {test:/\.(png|jpg)$/,loader:'url-loader?limit=8192'}
        ]
    }
}
```

如果图片小于8192字节就打成base64格式图片，否则就打成链接。可以看见，src目录下的3个图片分别被打成了2个链接和一个base64格式的图片，
再看bundle.js源码：

```javascript
[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var img1 = document.createElement('img')
	img1.src = __webpack_require__(1)
	document.body.appendChild(img1)

	var img2 = document.createElement('img')
	img2.src = __webpack_require__(2)
	document.body.appendChild(img2)

	var img3 = document.createElement('img')
	img3.src = __webpack_require__(3)
	document.body.appendChild(img3)


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ae49be91c349b22e82fa5721f51d210b.jpg";

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "data:image/jpeg;base64,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"

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "00d2010cfe604b655795440e7ae98caa.jpg";

/***/ }
/******/ ]
```