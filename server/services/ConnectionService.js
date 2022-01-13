const debconsole = require('../utils/debconsole')
const { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, PLAYERS_MAX_NUMBER } = require('../constants/game')
const ERRORS = require('../constants/errors')
const responseStatus = require('../enums/responseStatus')
const userStatus = require('../enums/userStatus')
const Room = require('../models/Room')
const User = require('../models/User')
const store = require('../store')

const responseWithError = (error, status = responseStatus.error) => ({ status, ...error })
const responseWithSuccess = (user, room) => ({ status: responseStatus.ok, user, room })

class ConnectionService {
  currentUser = null
  currentRoom = null

  constructor(socket) {
    this.socket = socket
  }

  join({ username, id, roomId }, callback) {
    debconsole('joinUser', { username, id, roomId })
    if (username?.length < USERNAME_MIN_LENGTH || username?.length > USERNAME_MAX_LENGTH) {
      const response = responseWithError(ERRORS.USERNAME_LENGTH)
      return callback(response)
    }

    if (id) {
      const user = store.findUserById(id)
      if (user?.roomId === roomId) {
        return this._reconnectToRoom(user, username)
      }
    }

    debconsole('- new user')
    const user = new User(this.socket.id, username)
    if (roomId) {
      this._joinToRoom(roomId, user, callback)
    } else {
      this._createRoom(user, callback)
    }
  }

  _reconnectToRoom(user, username, callback) {
    debconsole('_reconnectToRoom')
    const room = store.findRoom(user.roomId)
    if (user.username !== username) {
      if (room.users.find((u) => u.username === username)) {
        const response = responseWithError(ERRORS.UNUNIQUE_USERNAME)
        return callback(response)
      }

      user.username = username
    }
    this.currentUser = user
    this.currentRoom = room

    // if (this.currentUser.status === userStatus.disconnect) {
    //   this.socket.broadcast.to(room.id).emit('RECONNECTED_USER', {
    //     user: this.currentUser,
    //     room: this.currentRoom,
    //   })
    // }

    this.currentUser.reconnect(this.socket.id)
    this.socket.join(this.currentRoom.id)
    callback(responseWithSuccess(user, room))
  }

  _joinToRoom(roomId, user, callback) {
    debconsole('_joinToRoom')
    const room = store.findRoom(roomId)
    if (!room) {
      const response = responseWithError(ERRORS.NONEXISTENT_ROOM)
      return callback(response)
    }

    if (room.usersNumber === PLAYERS_MAX_NUMBER) {
      const response = responseWithError(ERRORS.PLAYERS_LIMIT)
      return callback(response)
    }

    if (room.findUserByUsername(user.username)) {
      const response = responseWithError(ERRORS.UNUNIQUE_USERNAME)
      return callback(response)
    }

    store.users.push(user)
    room.addUser(user)
    this.currentUser = user
    this.currentRoom = room
    this.socket.join(roomId)
    this.socket.broadcast.to(roomId).emit('JOINED_NEW_USER', user)
    callback(responseWithSuccess(user, room))
  }

  _createRoom(user, callback) {
    debconsole('- new room')
    this.currentUser = user
    this.currentRoom = new Room(this.currentUser)
    store.rooms.push(this.currentRoom)
    store.users.push(this.currentUser)
    this.socket.join(this.currentRoom.id)
    callback(responseWithSuccess(this.currentUser, this.currentRoom))
  }

  disconnect() {
    debconsole('disconnect')
    if (this.currentUser && this.currentUser.status !== userStatus.refresh) {
      const isFullDisconnect = this.currentRoom.disconnectUser(this.currentUser)
      if (isFullDisconnect) {
        debconsole(`- user ${this.currentUser.username} removed`)
        store.users = store.users.filter(({ id }) => id !== this.currentUser.id)
      }

      if (this.currentRoom.isActive) {
        // this.socket.broadcast.to(this.currentUser.roomId).emit('disconnected-user', {
        //   username: this.currentUser.username,
        //   room: this.currentRoom,
        // })
      } else {
        removeRoom(this.currentRoom)
      }
    }
  }

  refresh() {
    debconsole('refresh')
    this.currentUser.refresh()
    const interval = 10000
    setTimeout(() => {
      if (
        this.currentUser.status !== userStatus.online &&
        this.currentUser.startDisconnectTime + interval <= Date.now()
      ) {
        this.currentUser.disconnect()
        this.disconnect()
      }
    }, interval)
  }

  reestablishConnection({ id, roomId }, callback) {
    debconsole('reestablish-connect')

    const room = store.findRoom(roomId)
    if (!room) {
      return callback(responseWithError(ERRORS.NONEXISTENT_ROOM))
    }

    const user = room.findUserById(id)
    if (!user) {
      return callback(responseWithError(ERRORS.NOT_AUTHORIZED, responseStatus.notAuthorized))
    }
    this.currentUser = user
    this.currentRoom = room

    user.reconnect(this.socket.id)
    this.socket.join(room.id)
    debconsole(`- user ${this.currentUser.username} reestablished`)
    callback(responseWithSuccess(this.currentUser, this.currentRoom))
  }
}

function removeRoom(selectedRoom) {
  debconsole('removeRoom')
  const interval = 20000
  selectedRoom.startRemoveTime = Date.now()
  setTimeout(() => {
    if (!selectedRoom.isActive && selectedRoom.startRemoveTime + interval <= Date.now()) {
      debconsole(`- remove room ${selectedRoom.id}`)
      store.users = store.users.filter(({ roomId }) => roomId !== selectedRoom.id)
      store.rooms = store.rooms.filter(({ id }) => id !== selectedRoom.id)
    }
  }, interval)
}

module.exports = ConnectionService
