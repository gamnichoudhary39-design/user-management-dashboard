import { createStore } from 'vuex'

export default createStore({

  state: {

    users: []

  },

  mutations: {

    setUsers(state, users) {

      state.users = users

    },

    addUser(state, user) {

      state.users.unshift(user)

    },

    deleteUser(state, id) {

      state.users =
      state.users.filter(
        user => user.id !== id
      )

    },

    updateUser(state, updatedUser) {

      const index =
      state.users.findIndex(
        u => u.id === updatedUser.id
      )

      if(index !== -1) {

        state.users[index] = updatedUser

      }

    }

  },

  actions: {

    setUsers({ commit }, users) {

      commit('setUsers', users)

    },

    addUser({ commit }, user) {

      commit('addUser', user)

    },

    deleteUser({ commit }, id) {

      commit('deleteUser', id)

    },

    updateUser({ commit }, user) {

      commit('updateUser', user)

    }

  },

  getters: {

    allUsers: (state) => state.users

  }

})