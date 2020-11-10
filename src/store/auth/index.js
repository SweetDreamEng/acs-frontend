import Vue from 'vue'
import router from '../../router'

const module = {
  namespaced: true,
  state: {
    token: null,
    user: {
      role: null,
      email: null,
      username: null
    },
    error: null,
    loading: true,
    button_loading: false
  },

  actions: {
    signup({
      commit
    }, {
      name, email, password
    }) {
      commit('BUTTON_LOAD')
      const data = {
        name,
        email,
        password
      }

      this.$axios.post('/auth/signup', data)
        .then((response) => {
          commit('SET_TOKEN', response.data.access_token)
          Vue.auth.setToken(response.data.access_token)
          this.$axios.post('/auth/check')
            .then((response) => {
              commit('BUTTON_CLEAR')
              commit('SET_AUTH_DATA', response.data)
              router.push('/acs-machines')
            })
            .catch((error) => {
              commit('BUTTON_CLEAR')
              console.log(error.response.data)
            })
        })
        .catch((error) => {
          commit('BUTTON_CLEAR')
          if (error.response.status === 401) {
            commit('SET_ERROR', {
              'error': 'Email and password incorrect.'
            })
          } else if (error.response.status === 400) {
            console.log(error.response)
            commit('SET_ERROR', {
              'error': 'Some validation error.'
            })
          }
        })
    },
    signIn({
      commit
    }, {
      email, password
    }) {
      commit('BUTTON_LOAD')
      const data = {
        email,
        password
      }

      this.$axios.post('/auth/signin', data)
        .then((response) => {
          commit('SET_TOKEN', response.data.access_token)
          Vue.auth.setToken(response.data.access_token)
          this.$axios.post('/auth/check')
            .then((response) => {
              commit('BUTTON_CLEAR')
              commit('CLEAR_ERROR')
              commit('SET_AUTH_DATA', response.data)
              
              console.log(response.data)

              router.push({
                name: 'acs-machines'
              })
            })
            .catch((error) => {
              commit('BUTTON_CLEAR')
              console.log(error)
            })
        })
        .catch((error) => {
          commit('BUTTON_CLEAR')
          if (error.response.status === 400) {
            commit('SET_ERROR', {
              'error': 'Email and password incorrect.'
            })
          } else if (error.response.status === 400) {
            console.log(error.response)
            commit('SET_ERROR', {
              'error': 'Some validation error.'
            })
          }
        })
    },

    /**
     *
     * Logout
     *
     * @param {*} param0
     */
    signOut({ commit }) {
      // commit('SPINER_LOAD')
      this.$axios.get('/auth/logout')
        .then((response) => {
          if (response.status === 200) {
            commit('SET_LOGOUT_ATUH')
            router.push({
              name: 'auth-signin'
            })
            // commit('SPINER_CLEAN')
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem('token')
            // location.reload()
          }
        })
    },
    updatePassword({
      commit, dispatch
    }, {
      currentPassword, newPassword
    }) {
      commit('BUTTON_LOAD')
      const data = {
        current_password: currentPassword,
        new_password: newPassword
      }

      this.$axios.post('/auth/update-password', data)
        .then((response) => {
          dispatch('app/showSuccess', response.data.message, { root: true })
          commit('BUTTON_CLEAR')
        })
        .catch((error) => {
          commit('BUTTON_CLEAR')
          if (error.response.status === 401) {
            commit('SET_ERROR', {
              'error': 'Email and password incorrect.'
            })
          } else if (error.response.status === 400) {
            commit('SET_ERROR', {
              'error': error.response.data.error
            })
          } else if (error.response.status === 422) {
            const errors = Object.values(error.response.data.error).flat()

            commit('SET_ERROR', {
              'error': errors[0]
            })
          }
        })
    },
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    }
  },

  mutations: {
    SET_ERROR(state, error) {
      state.error = error.error
    },
    CLEAR_ERROR(state) {
      state.error = null
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_AUTH_DATA(state, user) {
      state.user.email = user.email
      state.user.username = 'Jone Doe'
      state.user.role = user.role
    },
    SET_LOGOUT_ATUH(state) {
      state.token = null
      localStorage.removeItem('token')
      // router.go('/')
    },
    // BUTTON load
    BUTTON_LOAD(state) {
      state.button_loading = true
    },

    BUTTON_CLEAR(state) {
      state.button_loading = false
    }
  },
  getters: {
    hasToken: (state) => {
      return state.token
    },
    profile: (state) => {
      return state.user
    }
  }
}

export default module