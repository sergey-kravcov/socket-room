const http = require('http')
const app = require('express')()
const server = http.createServer(app)
const io = require('socket.io')(server)

const MainService = require('./services/MainService')

const debconsole = require('./utils/debconsole')

io.on('connection', (socket) => {
  debconsole('connection')
  const service = new MainService(socket)

  socket.on('disconnect', () => service.disconnect())

  socket.on('join', (...arg) => service.join(...arg))

  socket.on('refresh', () => service.refresh())

  socket.on('reestablish-connection', (...arg) => service.reestablishConnection(...arg))
})

module.exports = {
  app,
  server,
}
