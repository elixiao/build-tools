## babel-loader

babel-loader可以将es6的语法转换为es5的，
因此如果你的项目采用es6的新特性，用webpack时要采用babel loader，否则会报错。

例如import语句就不支持，提示：

```
bundle.js:47 Uncaught SyntaxError: Unexpected token import
```

在webpack配置文件webpack.config.js中加上下面一句话就可以了：

```
module: {
  loaders:[
      {
          test:/.js$/,
          exclude:/node_modules/,
          loader:'babel',
          query: {
              presets:['es2015']
          }
      }
  ]
}
```

编译的时候可能会有点慢，请耐心等待即可。