import Vue from 'vue'
import format from 'date-fns/format'

Vue.filter('formatDate', (value, filterFormat) => {
  if (value) {
    return filterFormat ? format(new Date(value), filterFormat) : format(new Date(value), 'yyyy-MM-dd')
  }

  return ''
})
