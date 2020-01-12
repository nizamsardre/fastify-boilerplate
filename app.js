const config = require('./config')
const mongo = require('./models')
const { errorHandlerMiddleware } = require('./helpers/errorHandler')
const { registerRoutes } = require('_/helpers/routes');
const fastify = require('fastify')({
  logger: true
})


registerRoutes(fastify)
fastify.setErrorHandler(errorHandlerMiddleware)

// Run the server!
fastify.listen(config.port, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  mongo()
  fastify.log.info(`server listening on ${address}`)
})
