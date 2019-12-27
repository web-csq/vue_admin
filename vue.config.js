const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = ['js', 'css'] // 需要gzip压缩的文件后缀
const path = require('path')
const IS_PROD = ['production',"test"].includes(process.env.NODE_ENV)
const filenameHashing = true;
const productionSourceMap = !IS_PROD;
const assetsDir = '';
function resolve (dir) {
  return path.join(__dirname, dir)
}
function getAssetPath (assetsDir, filePath) {
  return assetsDir
    ? path.posix.join(assetsDir, filePath)
    : filePath
}
module.exports = {
    publicPath: process.env.NODE_ENV === 'development'? "./": "././",
    productionSourceMap: false,
    filenameHashing:true,
    outputDir:"./dist",
    devServer: {
        open:true,
        https: true,
        proxy: {
            '/api': {
                target:'https://test.spss.soiiu.com:8580', //代理接口
                //target:'https://localhost:8580', //代理接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    },
    css: {
      // 是否使用css分离插件 ExtractTextPlugin
      extract: true,
      // 开启 CSS source maps?
      sourceMap: false,
      // css预设器配置项
      loaderOptions: {},
      // 启用 CSS modules for all css / pre-processor files.
      modules: false
    },
    chainWebpack:config =>{
        // 指定环境打包js路径
      if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
        const isLegacyBundle = process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD
        const filename = getAssetPath(
          assetsDir,
          `js/[name]${isLegacyBundle ? `-legacy` : ``}${filenameHashing ? '.[contenthash:8]' : ''}.js`
        )
        config.mode('production').devtool(productionSourceMap ? 'source-map' : false).output.filename(filename).chunkFilename(filename)
      }
    },
    configureWebpack:config=>{
      if(IS_PROD){
        config.externals={
          "vue":"Vue",
          "vuex":"Vuex",
          "vue-router":"VueRouter",
          "axios":"axios",
          "element-ui":"ELEMENT",
          "iview":"iview",
          "G2":"G2",
          "DataSet":"DataSet",
          "screenfull":"screenfull"
        }
        config.plugins.push(
            new CompressionPlugin({
                test:/\.js$|\.html$|.\css/, //匹配文件名
                threshold: 10240,//对超过10k的数据压缩
                deleteOriginalAssets: false, //不删除源文件
                algorithm: 'gzip',
            })
        )
        
      }
    }
}
