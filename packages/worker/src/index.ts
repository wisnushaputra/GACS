import { Worker, Job } from 'bullmq'
import { createClient } from 'redis'
import pino from 'pino'

const logger = pino({ level: 'info' })
const connection = { host: 'localhost', port: 6379 } // Adjust according to env

const queueName = 'default'

const processor = async (job: Job) => {
  logger.info(`Processing job ${job.id} with data: ${JSON.stringify(job.data)}`)
  // Add job processing logic here
  return { status: 'success' }
}

const worker = new Worker(queueName, processor, { connection })

worker.on('completed', (job) => {
  logger.info(`${job.id} has completed!`)
})

worker.on('failed', (job, err) => {
  logger.error(`${job?.id} has failed with ${err.message}`)
})

logger.info(`Worker listening on queue: ${queueName}`)
