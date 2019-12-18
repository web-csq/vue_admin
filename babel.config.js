const plugins = ['transform-remove-strict-mode'];
/**
 * 去除console
 */
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console');
}
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: plugins
}
