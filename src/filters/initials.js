import Vue from 'vue'

Vue.filter('initials', (value) => {
  if (!value) return ''
  const _initials = value.match(/\b\w/g) || []

  return ((_initials.shift() || '') + (_initials.pop() || '')).toUpperCase()
})
