const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}



module.exports = {
    // 基本路径
    baseUrl: '',
    // 输出文件目录
    outputDir: 'dist',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // webpack-dev-server 相关配置
    devServer: {
        port: 8888,
    },
}


