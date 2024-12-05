import kue from 'kue';

const jobs = [
  { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
  { phoneNumber: '4153518781', message: 'This is the code 4562 to verify your account' },
  { phoneNumber: '4153518743', message: 'This is the code 4321 to verify your account' },
  // Add the remaining data...
];

const queue = kue.createQueue();

jobs.forEach((jobData) => {
  const job = queue.create('push_notification_code_2', jobData).save((err) => {
    if (!err) console.log(`Notification job created: ${job.id}`);
  });

  job
    .on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    })
    .on('failed', (err) => {
      console.log(`Notification job ${job.id} failed: ${err.message}`);
    })
    .on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });
});
