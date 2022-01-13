const crypto = require('crypto')

const userStatus = require('../../enums/userStatus')

class BaseUser {
  constructor(connectionId, username, roomId = '') {
    this.id = crypto.randomBytes(20).toString('hex')

    this.connectionId = connectionId
    this.username = username
    this.roomId = roomId

    this.startDisconnectTime = null
    this.status = userStatus.online
    this.inHistory = false
  }

  reconnect(connectionId) {
    this.connectionId = connectionId
    this.status = userStatus.online
    this.startDisconnectTime = null
  }

  disconnect() {
    this.status = userStatus.disconnect
  }

  archive() {
    this.status = userStatus.archive
  }

  refresh() {
    this.startDisconnectTime = Date.now()
    this.status = userStatus.refresh
  }
}

module.exports = BaseUser
