## 配置文件

使用配置文件可以替代在命令行输入，例如：

```bash
webpack app.js dist/bundle.js
```

可以写在webpack.config.js里面：

```
module.exports = {
    entry: './src/app.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    }
};
```

这样只需在命令行输入以下命令即可：

```bash
webpack
```

输出结果为：

```
Hash: 939f75618a085447292c
Version: webpack 1.13.3
Time: 74ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.57 kB       0  [emitted]  main
   [0] ./src/app.js 47 bytes {0} [built]
   [1] ./src/cats.js 60 bytes {0} [built]
```