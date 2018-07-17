
const path = require('path');

module.exports = {
    mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
    entry: './app/main.js',
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
    }
};
