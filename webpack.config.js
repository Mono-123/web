const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
    },

    module: {   
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },  
    resolve: {
        extensions: ["*", ".js", ".jsx"],
    }
};