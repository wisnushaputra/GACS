import 'dotenv/config'
import Fastify from 'fastify'
import { logger } from './logger.js'

const fastify = Fastify({ loggerInstance: logger })

fastify.get('/', async (_request, _reply) => {
  return { hello: 'world' }
})

fastify.get('/health', async (_request, _reply) => {
  return { status: 'ok' }
})

fastify.setErrorHandler(function (error, request, reply) {
  this.log.error(error)
  const message = error instanceof Error ? error.message : 'An unexpected error occurred'
  reply.status(500).send({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message,
    },
  })
})

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT ? parseInt(process.env.PORT) : 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()