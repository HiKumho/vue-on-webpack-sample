module.exports = {
	devtool: 'eval-source-map', // 编译文件与源文件映射
	entry: __dirname + '/app/main.js',
	output: {
		path: __dirname + '/public',
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
				loader: 'vue-loader'
			}
		]
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js' // 需要客户端解析 vue template ，这里将 vue 指向完整版，vue 默认为 vue.runtime.js @https://cn.vuejs.org/v2/guide/installation.html
		}
	}
}