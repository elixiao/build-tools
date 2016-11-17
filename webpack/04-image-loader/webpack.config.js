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
