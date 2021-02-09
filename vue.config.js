// vue.config.js
module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: ''
      },
    }
  },
  devServer: {
    hot: false,
    liveReload: true
  }
};
