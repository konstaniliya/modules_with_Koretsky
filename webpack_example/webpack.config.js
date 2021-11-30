const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { template } = require("lodash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    entry: "./src/js/main.js",
    output: {
        filename: 'main[contenthash].js',
        clean: true,
        path: path.resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: ['file-loader']
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
              },
              {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
              },
        ]
    },
    plugins: [new HtmlWebpackPlugin({template: path.resolve(__dirname,'src','template.html')}),
    new MiniCssExtractPlugin({}),
    new BundleAnalyzerPlugin()],
}