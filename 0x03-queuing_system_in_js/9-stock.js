import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const app = express();
const client = createClient();
const getAsync = promisify(client.get).bind(client);

const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 },
];

const getItemById = (id) => listProducts.find((item) => item.id === id);

app.get('/list_products', (req, res) => {
  res.json(
    listProducts.map((item) => ({
      itemId: item.id,
      itemName: item.name,
      price: item.price,
      initialAvailableQuantity: item.stock,
    }))
  );
});

app.get('/list_products/:itemId', async (req, res) => {
  const item = getItemById(Number(req.params.itemId));
  if (!item) {
    res.json({ status: 'Product not found' });
    return;
  }

  const reservedStock = await getAsync(`item.${item.id}`) || 0;
  res.json({
    itemId: item.id,
    itemName: item.name,
    price: item.price,
    initialAvailableQuantity: item.stock,
    currentQuantity: item.stock - reservedStock,
  });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const item = getItemById(Number(req.params.itemId));
  if (!item) {
    res.json({ status: 'Product not found' });
    return;
  }

  const reservedStock = parseInt(await getAsync(`item.${item.id}`)) || 0;
  if (reservedStock >= item.stock) {
    res.json({ status: 'Not enough stock available', itemId: item.id });
    return;
  }

  client.set(`item.${item.id}`, reservedStock + 1);
  res.json({ status: 'Reservation confirmed', itemId: item.id });
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
