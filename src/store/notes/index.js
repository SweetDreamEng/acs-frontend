import noteAPI from '@/services/api/note'

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

    async addNote ({ commit, state }, data) {
      state.isNoteAdding = true

      try {
        const response = await noteAPI.addNote(data)

        commit('SET_DATA', response.data.notes)
      } catch (error) {
        console.log(error)
      } finally {
        state.isNoteAdding = false
      }
    }
  },

  mutations: {
    SET_DATA(state, notes) {
      state.data = notes
    }
  }
}

export default module