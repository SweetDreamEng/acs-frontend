import api from '@/api.js'
export default {
  addNote(data) {
    return api.post('/notes/store', data).then((response) => {
      return response
    })
  },
  getNotes(device_id) {
    return api.get(`/notes/${device_id}`).then((response) => {
      return response
    })
  }
}