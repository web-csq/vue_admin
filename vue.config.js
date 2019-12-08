module.exports = {
    publicPath: './',
    devServer: {
        open:true,
        proxy: {
            '/api': {
                target: 'http://xxxx/device/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    }
}