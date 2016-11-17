module.exports = {
    entry: __dirname + '/src/entry.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel']
            }
        ]
    }
};