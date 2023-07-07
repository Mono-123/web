const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        proxy: {
            '/api': {
              target: 'http://localhost:8080',
              pathRewrite: { '^/api': '' },
            },
            '/uploadFile': {
                target: 'http://localhost:8080',
              },
        },
        port: 3000,
        historyApiFallback: true,   
    },
    devtool: "eval-source-map",
    module: {   
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
              test: /\.css$/i,
              use: ["style-loader", "css-loader"],
            },
        ],
    },  
    resolve: {
        extensions: ["*", ".js", ".jsx", ".css"],
    }
};