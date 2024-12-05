import { createClient } from 'redis';

// Create and connect Redis client
const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Create a hash and add values
const hashKey = 'HolbertonSchools';
const locations = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2,
};

for (const [key, value] of Object.entries(locations)) {
  client.hset(hashKey, key, value, (err, reply) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Reply: ${reply}`);
    }
  });
}

// Retrieve and display the hash
client.hgetall(hashKey, (err, object) => {
  if (err) {
    console.error(err);
  } else {
    console.log(object);
  }
});
