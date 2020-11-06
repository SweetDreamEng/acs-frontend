import Vue from 'vue'

Vue.filter('formatPhoneNumber', (value) => {
  if (!value) return ''

  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

  if (phoneRegex.test(subjectString)) {
	    return subjectString.replace(phoneRegex, '($1) $2-$3')
  } else {
	    return 'Invalid'
  }
})
