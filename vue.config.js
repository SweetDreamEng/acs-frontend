module.exports = {
  productionSourceMap: false,
  css: {
    extract: { ignoreOrder: true },
    loaderOptions: {
      sass: {
        additionalData: '@import \'~@/assets/scss/vuetify/variables\''
      },
      scss: {
        additionalData: '@import \'~@/assets/scss/vuetify/variables\';'
      }
    }
  },

  // https://cli.vuejs.org/config/#transpiledependencies
  transpileDependencies: [
    'vuetify'
  ]
}
