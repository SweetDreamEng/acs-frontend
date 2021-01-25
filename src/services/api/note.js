import api from '@/api.js'
export default {
  async addNote(data) {
    return await api.post('/notes/store', data)
  },

  async getNotes(device_id) {
    return await api.get(`/notes/${device_id}`)
  }
}