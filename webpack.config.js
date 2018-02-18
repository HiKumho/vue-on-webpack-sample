var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'eval-source-map', // 编译文件与源文件映射
    entry: path.join(__dirname, 'app/main.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {    // webpack dev server 配置
        contentBase: './public', // 根目录
        inline: true // 实时更新
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    cssModules: {
                        localIdentName: '[name]-[local]-[hash:base64:5]',
                        cameCase: true
                    }
                }
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader' // 将 style 节点注入 DOM 中
                    }, {
                        loader: 'css-loader' // 读取引用的 css 文件, @import
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            config: './postcss.config.js'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js' // 需要客户端解析 vue template ，这里将 vue 指向完整版，vue 默认为 vue.runtime.js @https://cn.vuejs.org/v2/guide/installation.html
        }
    },
    plugins: [ // 作用于 webpack 整个构建生命周期
        new webpack.BannerPlugin('版权所有，翻版必究'), // 版权声明插件
        new HtmlWebpackPlugin({                      //  从模板构建 public/index.html
            template: path.join(__dirname, 'app/index.tmpl.html')
        })
    ]
}