module.exports = {
  productionSourceMap: false,
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
