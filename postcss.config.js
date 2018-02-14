module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-cssnext')   // 使用 cssnext 插件，已启用 Autoprefixer 
    ]
}