import api from '@/api.js'
export default {
	/*
    Add a new note for a product
    params:
      {
        deviceId: Number,
        note: String
      }
  */
  addNote(data) {
    return api.post('/notes/store', data)
  },

  /*
    Get notes for a product
    params: device_id
    return : notes: Array
  */
  getNotes(device_id) {
    return api.get(`/notes/${device_id}`)
  }
}