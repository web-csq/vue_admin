const plugins = ['transform-remove-strict-mode'];
/**
 * 去除console
 */
if (['production',"test"].includes(process.env.NODE_ENV)) {
  plugins.push('transform-remove-console');
}
module.exports = {
  presets: [
    '@vue/app',
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "12.13"
        },
        "corejs": "2", // 声明corejs版本
        "useBuiltIns": "usage"
      }
    ]
  ],
  plugins: plugins
}
