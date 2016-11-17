## json-loader

顾名思义，又是一个模块加载器，专门用于处理json文件的。二话不说，先装插件：

```
npm install --save json-loader
```

使用方法是：

```
var json = require("!json!./file.json");
```

千万别参照[文档](https://github.com/webpack/json-loader)里面的用法，因为少了最开始的感叹号！
最终的webpack.config.js配置文件是：

```javascript
module.exports = {
    entry: './src/entry.js',
    output: {
        path: __dirname + '/dist',
        filename:'bundle.js'
    },
    
    module: {
      loaders:[
          {test:/\.json$/, loader:'json'}
      ]  
    }
};
```

我们来看看json-loader的源码，就4行：

```javascript
module.exports = function(source) {
	this.cacheable && this.cacheable();
	var value = typeof source === "string" ? JSON.parse(source) : source;
	this.value = [value];
	return "module.exports = " + JSON.stringify(value, undefined, "\t") + ";";
}
```

一个loader大致长这样：

```javascript
module.exports = function(source) {
    this.cacheable && this.cacheable();
    // do something about the source
    return dealedSource //返回处理过的source
    // this.callback(null,dealedSource,map) //如果有sourcemap
}
```

至于json-loader源码代表什么意思，以及如何自己写一个loader，等下次再详细道来。