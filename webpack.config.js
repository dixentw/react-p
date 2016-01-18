var path = require('path');

var config = {
    entry: './app/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                presets:['react','es2015']
            }
        }]
    }
};

module.exports = config;
