const express = require('express');
const next = require('next');
const { fetchCoins, fetchCoinDetails } = require('./services/coins.service');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 5000;

app.prepare().then(() => {
  const server = express();
  // Endpoint to fetch list of coins
  server.get('/coins', async (req, res) => {
    try {
      const coins = await fetchCoins(req);
      res.json(coins);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Endpoint to fetch details of a specific coin
  server.get('/coinDetails/:id', async (req, res) => {
    try {
      const coinDetails = await fetchCoinDetails(req);
      res.json(coinDetails);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        res.status(404).json({ error: 'Coin not found' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
