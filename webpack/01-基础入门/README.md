## 使用方法

```bash
webpack app.js bundle.js
```

app.js是打包的入口，
在app.js里面引用了cats.js，
webpack会自动找到app的依赖并加载。

输出结果为：


```bash
Hash: 939f75618a085447292c
Version: webpack 1.13.3
Time: 74ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.57 kB       0  [emitted]  main
   [0] ./app.js 47 bytes {0} [built]
   [1] ./cats.js 60 bytes {0} [built]
```