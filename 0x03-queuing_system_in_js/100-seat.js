import express from 'express';
import { createClient } from 'redis';
import kue from 'kue';
import { promisify } from 'util';

const app = express();
const client = createClient();
const queue = kue.createQueue();

let reservationEnabled = true;
const DEFAULT_SEATS = 50;

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
  return parseInt(await getAsync('available_seats')) || 0;
}

// Initialize seats
reserveSeat(DEFAULT_SEATS);

app.get('/available_seats', async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: availableSeats });
});

app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (!err) res.json({ status: 'Reservation in process' });
    else res.json({ status: 'Reservation failed' });
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err}`);
  });
});

app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    const availableSeats = await getCurrentAvailableSeats();
    if (availableSeats <= 0) {
      reservationEnabled = false;
      done(new Error('Not enough seats available'));
    } else {
      await reserveSeat(availableSeats - 1);
      if (availableSeats - 1 === 0) reservationEnabled = false;
      done();
    }
  });
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
