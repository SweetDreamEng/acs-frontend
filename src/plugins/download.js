import Vue from 'vue'
Vue.prototype.$download = function (filename) {
  const anchor = document.createElement('a')

  anchor.setAttribute('download', response.filename)
  anchor.setAttribute('href', filename)
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
}
