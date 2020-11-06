import Vue from 'vue'

Vue.filter('percentageLabel', (value) => {
  if (!value) return ''

  return value.toString() + '%'
})
