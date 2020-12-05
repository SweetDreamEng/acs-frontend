module.exports = {
  // https://cli.vuejs.org/config/#productionsourcemap
  productionSourceMap: false,

  // development server
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //       target: VUE_APP_SERVER_API_ENDPOINT || 'http://localhost:8000/api',
  //       changeOrigin: true
  //     }
  //   }
  // },

  // https://cli.vuejs.org/config/#css-extract
  css: {
    extract: { ignoreOrder: true },
    loaderOptions: {
      sass: {
        prependData: '@import \'~@/assets/scss/vuetify/variables\''
      },
      scss: {
        prependData: '@import \'~@/assets/scss/vuetify/variables\';'
      }
    }
  },

  // https://cli.vuejs.org/config/#transpiledependencies
  transpileDependencies: [
    'vuetify'
  ]
}
