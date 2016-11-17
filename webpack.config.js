module.exports = {
    entry: __dirname + '/webpack/4.introduction/app/main.js',//唯一入口文件
    output: {
        path: __dirname + '/webpack/4.introduction/public',//打包后文件存放的地方
        filename:'bundle.js'//打包后输出的文件名
    }
};