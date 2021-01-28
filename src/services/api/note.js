import api from '@/api.js'
export default {
  async addNote(data) {
    return api.post('/notes/store', data)
  },

  async getNotes(device_id) {
    return api.get(`/notes/${device_id}`)
  }
}