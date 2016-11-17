## 打包CSS

webpack不仅能打包js文件，还能打包css。

```
module.exports = {
    entry:'./src/entry.js',
    output:{
        path:__dirname+'/dist', 
        filename:'bundle.js'
    },
    module: {
        loaders:[
            {test:/\.css$/,loader:'style!css'}
        ]
    }
};
```

我们发现webpack.config.js配置文件多了一个module模块，专门用来处理CSS，不过在这之前要安装打包css的插件：

```
npm install css-loader style-loader --save-dev
```

在我们的入口文件entry.js里面加入下面这句话引用同级目录下的style.css文件：

```
require('!style!css!./style.css');
```

然后在我们的HTML文件里面直接引用bundle.js即可，那个style.css文件就会被自动加载：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>打包CSS</title>
    <script type="text/javascript" src="dist/bundle.js" charset="utf-8"></script>
</head>
<body></body>
</html>
```

好神奇，为何CSS也能被写在js里面加载呢？我们打开生成的bundle.js文件看看其中的奥妙：

```javascript
function createStyleElement(options) {
    var styleElement = document.createElement("style");
    styleElement.type = "text/css";
    insertStyleElement(options, styleElement);
    return styleElement;
}
```

上面是创建一个style元素，然后调用insertStyleElement方法，我们找到这个方法：

```javascript
function insertStyleElement(options, styleElement) {
    var head = getHeadElement();
    var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
    if (options.insertAt === "top") {
        if(!lastStyleElementInsertedAtTop) {
            head.insertBefore(styleElement, head.firstChild);
        } else if(lastStyleElementInsertedAtTop.nextSibling) {
            head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
        } else {
            head.appendChild(styleElement);
        }
        styleElementsInsertedAtTop.push(styleElement);
    } else if (options.insertAt === "bottom") {
        head.appendChild(styleElement);
    } else {
        throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
    }
}
```

上面的这段代码就是把刚才创建的style元素插到header里面。
