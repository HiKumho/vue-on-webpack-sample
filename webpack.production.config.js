var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	devtool: 'null', // 编译文件与源文件映射
	entry: path.join(__dirname, 'app/main.js'),
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle-[hash].js'  // 增加文件 hash 值，避免浏览器缓存
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
						loader: 'style-loader' // 将 css 插入 html 中
					}, {
						loader: 'css-loader' // 读取 css 文件，并解析
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
		}),
		new webpack.optimize.OccurrenceOrderPlugin(), // 为组件分配 ID
		new UglifyJsPlugin(), // 压缩 js 代码
		new ExtractTextPlugin('style.css'), // 分离 css 与 js 文件
		new CleanWebpackPlugin('public/*.*', { // 清除 webpack 打包后的 hash 文件
			root: __dirname,
			verbose: true,
			dry: false
		})
	]
}