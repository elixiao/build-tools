module.exports = {
    entry: __dirname + '/src/entry.js',
    output: {
        path: __dirname + '/dist',
        filename:'bundle.js'
    },
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
    },
};

// webpack提供两个工具处理样式表，css-loader 和 style-loader，
// 二者处理的任务不同，css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能
// style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
// devServer: {
//     contentBase:'./public',//本地服务器所加载的页面所在目录
//         colors:true,//终端输出结果为彩色
//         historyApiFallback:true,//不跳转
//         inline:true//时时刷新
// }