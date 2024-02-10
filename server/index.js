const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3';

app.use(cors());

// Endpoint to fetch list of coins
app.get('/api/coins', async (req, res) => {
    try {
        const response = await axios.get(`${COINGECKO_API_BASE_URL}/coins/markets`, {
            params: {
                vs_currency: 'usd',
                per_page: 10, // Example: get 10 coins per request
                page: req.query.page || 1 // Pagination
            }
        });
        const coins = response.data.map(coin => ({
            name: coin.name,
            symbol: coin.symbol,
            current_price: coin.current_price,
            high_24h: coin.high_24h,
            low_24h: coin.low_24h,
            price_change_percentage_24h: coin.price_change_percentage_24h
        }));
        res.json(coins);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch details of a specific coin
app.get('/api/coins/:id', async (req, res) => {
    try {
        const response = await axios.get(`${COINGECKO_API_BASE_URL}/coins/${req.params.id}`, {
            params: {
                localization: false,
                tickers: false,
                market_data: true,
                community_data: false,
                developer_data: false,
                sparkline: false
            }
        });
        const coinDetails = {
            name: response.data.name,
            current_price: response.data.market_data.current_price.usd,
            description: response.data.description.en,
            price_change_percentage_24h: response.data.market_data.price_change_percentage_24h,
            price_change_percentage_7d: response.data.market_data.price_change_percentage_7d,
            price_change_percentage_14d: response.data.market_data.price_change_percentage_14d,
            price_change_percentage_30d: response.data.market_data.price_change_percentage_30d,
            price_change_percentage_60d: response.data.market_data.price_change_percentage_60d,
            price_change_percentage_200d: response.data.market_data.price_change_percentage_200d,
            price_change_percentage_1y: response.data.market_data.price_change_percentage_1y,
            high_24h: response.data.market_data.high_24h,
            low_24h: response.data.market_data.low_24h
        };
        res.json(coinDetails);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'Coin not found' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});