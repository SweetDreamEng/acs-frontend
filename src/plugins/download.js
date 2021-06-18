import Vue from 'vue'
Vue.prototype.$download = function (filepath, filename) {
  const anchor = document.createElement('a')

  anchor.setAttribute('download', filename)
  anchor.setAttribute('href', filepath)
  anchor.setAttribute('target', '_blank')
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
}
