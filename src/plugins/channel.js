import Vue from 'vue'
import Pusher from 'pusher-js'

Vue.prototype.$pusher = Pusher

const pusher = new Pusher('ce4734b07a1e03416f4c', {
  cluster: 'mt1'
})

const channel = pusher.subscribe('product.alarm.channel')

Vue.prototype.$channel = channel