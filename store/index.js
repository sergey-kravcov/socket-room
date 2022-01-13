import { make } from 'vuex-pathify'

export const state = () => ({
  user: {},
  room: {},
})

export const getters = {
  ...make.getters(state),
}

export const mutations = {
  ...make.mutations(state),
  SOCKET_JOINED_NEW_USER(state, user) {
    state.room.users.push(user)
  },
}
