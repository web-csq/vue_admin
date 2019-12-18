const webpack = require("webpack");
module.exports = {
    publicPath: process.env.NODE_ENV === 'development'?'./':"././",
    devServer: {
        open:true,
        https: true,
        proxy: {
            '/api': {
                target:'https://test.soiiu.com:8580', //代理接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          Popper: ['popper.js', 'default']
         })
      ]
     }
}