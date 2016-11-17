module.exports = {
    entry:'./src/entry.js', //唯一的入口文件
    output:{
        path:__dirname+'/dist', //打包后的文件存放的地方,__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
        filename:'bundle.js' //打包后文件名
    },
    module: {
        loaders:[
            {test:/\.css$/,loader:'style!css'}
        ]
    }
};


// npm可以引导任务执行，对其进行配置后可以使用简单的npm start命令来代替这些繁琐的命令。
// 在package.json中对npm的脚本部分进行相关设置即可，设置方法如下。
// npm的start是一个特殊的脚本名称，它的特殊性表现在，在命令行中使用npm start就可以执行相关命令，
// 如果对应的此脚本名称不是start，想要在命令行中运行时，需要这样用npm run {script name}如npm run build，以下是执行npm start后命令行的输出显示
// devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
