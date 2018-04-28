var path = require('path');
var HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: "development",
    //项目入口
    entry: "./src/index.ts",
    //输出设置
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    externals: {
        three: "THREE",
    },
    resolve: {
        extensions: ['.ts','.glsl','.js', '.html']  
    },
    //调试工具
    devtool: "source-map",
    //模块加载器设置
    module: {
        rules: [
            { test: /\.(tsx|ts)?$/, loader: "awesome-typescript-loader" },
            { test: /\.(glsl)$/, use: 'raw-loader' }
        ]
    },
    //调试服务
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 7777
    },
    //插件
    plugins: [
        new HtmlWebPackPlugin(
            {
                template: 'src/index.ejs'
            }),
        new CopyWebpackPlugin([
            {
                from: __dirname + "/../threeJs/three.min.js",
                to: __dirname + "/dist/public"
            },
            {
                from: __dirname + '/src/shader',
                to: __dirname + "/dist/public"
            }
        ])

    ]
}