const path = require("path");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, 'app/client/src/app.js')
    ],
    module: {
        rules: [
            {
                test: /\.([jt]sx?)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel'),
                        ].filter(Boolean),
                    },
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
        isDevelopment && new webpack.HotModuleReplacementPlugin(),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    devServer: {
        hot: true,
        historyApiFallback: true
    },
    devtool: 'eval-source-map'
};