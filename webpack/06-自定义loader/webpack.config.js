module.exports = {
    entry: './src/entry.js',
    output: {
        path: __dirname + '/dist',
        filename:'bundle.js'
    },
    // module: {
    //     loaders:[
    //         {test:/\.md$/, loader:'md'}
    //     ]
    // }
};

