import noteAPI from '../../services/api/note'

const module = {
  namespaced: true,
  state: {
    data: [],
    isNoteAdding: false
  },

  actions: {
    async getNotes ({ commit }, product_id ) {
      try {
        const response = await noteAPI.getNotes(product_id)

        commit('SET_DATA', response.data.notes)
      } catch (error) {
        console.log(error)
      }
    },

    async addNote ({ commit }, data) {
      commit('SET_IS_NOTE_ADDING', true)

      try {
        const response = await noteAPI.addNote(data)

        commit('SET_DATA', response.data.notes)
      } catch (error) {
        console.log(error)
      } finally {
        commit('SET_IS_NOTE_ADDING', false)
      }
    }
  },

  mutations: {
    SET_DATA(state, notes) {
      state.data = notes
    },
    SET_IS_NOTE_ADDING(state, data) {
      state.isNoteAdding = data
    }
  }
}

export default module