const crypto = require('crypto')

const { PLAYERS_MIN_NUMBER } = require('../../constants/game')
const roomStatus = require('../../enums/roomStatus')
const userStatus = require('../../enums/userStatus')

class BaseRoom {
  constructor(creator) {
    this.id = crypto.randomBytes(20).toString('hex')
    this.users = []
    this.status = roomStatus.waiting
    this.startRemoveTime = null
    this.addCreator(creator)
  }

  addCreator(creator) {
    this.creator = creator
    this.addUser(creator)
  }

  addUser(user) {
    user.roomId = this.id
    this.users.push(user)
    this.changeStatus()
  }

  findUserById(userId) {
    return this.users.find(({ id }) => id === userId)
  }

  findUserByUsername(username) {
    return this.activeUsers.find((user) => user.username === username)
  }

  disconnectUser(user) {
    if (user.id === this.creator.id) {
      this.creator = this.activeUsers.find(({ id, status }) => id !== user.id && status !== userStatus.disconnect)
    }
    if (user.inHistory) {
      user.archive()
    } else {
      this.users = this.users.filter(({ id }) => id !== user.id)
    }
    this.changeStatus()
    return !user.inHistory
  }

  changeStatus() {
    if (this.usersNumber >= PLAYERS_MIN_NUMBER) {
      if (this.status === roomStatus.waiting) {
        this.status = roomStatus.preparation
      }
    } else {
      this.status = roomStatus.waiting
    }
  }

  get activeUsers() {
    return this.users.filter(({ status }) => status !== userStatus.archive)
  }

  get usersNumber() {
    return this.activeUsers.length
  }

  get isActive() {
    return this.users.some(({ status }) => status !== userStatus.disconnect && status !== userStatus.archive)
  }
}

module.exports = BaseRoom
