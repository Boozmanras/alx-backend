import { createClient } from 'redis';

// Create and connect Redis client
const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Subscribe to the channel
const channel = 'holberton school channel';
client.subscribe(channel);

client.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    client.unsubscribe(channel);
    client.quit();
  }
});
