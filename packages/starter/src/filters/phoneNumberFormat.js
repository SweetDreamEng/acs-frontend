import Vue from 'vue'

Vue.filter('phoneNumberFormat', (value) => {
  if (!value) return ''

  return value.replace(/\b\w/g, (l) => l.toUpperCase())
})
