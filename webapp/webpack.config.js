var webpack = require("webpack");
var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: "./app/main.ts",
        vendor: "./app/vendor.ts"
    },
    cache: true,
    output: {
        path: path.join(__dirname, "../priv/static"),
        filename: "js/[name].bundle.js",
        sourceMapFilename: "js/[name].map",
        chunkFilename: "js/[id].chunk.js"
    },
    resolve: {
        modules: [ path.resolve("app") ],
        extensions: [".ts", ".js", ""]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({ name: ["app", "vendor"], minChunks: Infinity }),
        new ExtractTextPlugin("[name].css"),
        new CopyWebpackPlugin([
            { from: "./index.html" },
            { from: "images/**/*" }
        ])
    ],
    module: {
        rules: [
            { test: /\.ts$/, loaders: ["awesome-typescript-loader", "angular2-template-loader", "angular2-router-loader"] },
            { test: /\.css$/, loaders: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader") },
            { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader") },
            { test: /\.html$/, loader: "raw-loader" },
            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file",
                query: {
                    name: "./fonts/[hash].[ext]"
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: "file",
                query: {
                    name: "./images/[hash].[ext]"
                }
            }
        ]
    },
    node: {
        global: true,
        crypto: "empty",
        module: false,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    }
};
