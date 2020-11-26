import Vue from 'vue'
Vue.prototype.$rules = {
  required: (value) => (value && Boolean(value)) || 'Required',
  emailFormat: (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
  phoneFormat: (v) => /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/.test(v) || 'Phone number must be valid'
}