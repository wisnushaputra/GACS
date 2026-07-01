import { Worker, Job } from 'bullmq';

console.log('Worker started');

const worker = new Worker('myQueue', async (job: Job) => {
  console.log(`Processing job ${job.id} with data:`, job.data);
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`Job ${job.id} completed.`);
  return { status: 'completed' };
});

worker.on('completed', job => {
  console.log(`Job ${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} has failed with error ${err.message}`);
});

process.on('SIGINT', async () => {
  await worker.close();
  console.log('Worker closed.');
  process.exit(0);
});

