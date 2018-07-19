
const path = require('path');

module.exports = {
    mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
    devtool: 'source-map',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ['env', 'react']
            }
        }]
    },
    devServer: {
        port: 8082,
        open: true,
        contentBase: 'build',
        proxy: {
            "/api": "http://localhost:3000/"
        }
    }
};
