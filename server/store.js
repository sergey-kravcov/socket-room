const store = {
  rooms: [],
  users: [],
  findRoom(roomId) {
    return this.rooms.find((room) => room.id === roomId)
  },
  findUserById(userId) {
    return this.users.find((user) => user.id === userId)
  },
}

module.exports = store
