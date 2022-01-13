const consola = require('consola')
const ip = require('ip')
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const { app, server } = require('./app')

config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server
  config.host = host || ip.address()
  config.port = port || 3000

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(nuxt.render)

  server.listen(config.port, config.host, () => {
    consola.ready({
      message: `Server listening on http://${config.host}:${config.port}`,
      badge: true,
    })
  })
}

start()
