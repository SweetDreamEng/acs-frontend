import api from '@/api.js'
export default {
  /**
  * Add a new note for a product
  *
  * @param {Object} note object for a new note
  * @example
  *
  *     addUser(user)
  */
  addNote(data) {
    return api.post('/notes', data)
  },

  /**
  * Get notes for a product
  *
  * @param {number} device id of the notes to be retrived
  * @example
  *
  *     getNotes(2)
  */
  getNotes(device_id) {
    return api.get(`/notes/${device_id}`)
  }
}