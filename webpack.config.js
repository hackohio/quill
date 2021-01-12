const path = require("path");
const webpack = require('webpack');


module.exports = {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        path.join(__dirname, 'app/client/src/app.js')
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: { 'react-dom': '@hot-loader/react-dom' },
    },
    output: {
        path: path.join(__dirname, 'app/client/build'),
        publicPath: '/build/',
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
    },
    devtool: 'eval-source-map'
};