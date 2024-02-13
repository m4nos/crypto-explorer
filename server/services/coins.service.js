const axios = require('axios');

async function fetchCoins(req) {
  try {
    const response = await axios.get(
      `${process.env.COINGECKO_API_BASE_URL}/coins/markets`,
      {
        params: {
          vs_currency: 'usd',
          per_page: req.query.pageSize,
          page: req.query.page,
          price_change_percentage: '24h'
        }
      }
    );
    return response.data.map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h
    }));
  } catch (error) {
    console.error('Error fetching coins list:', error);
    throw error;
  }
}

async function fetchCoinDetails(req) {
  const response = await axios.get(
    `${process.env.COINGECKO_API_BASE_URL}/coins/${req.params.id}`,
    {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false
      }
    }
  );
  return {
    name: response.data.name,
    current_price: response.data.market_data.current_price.usd,
    description: response.data.description.en,
    price_change_percentage_24h:
      response.data.market_data.price_change_percentage_24h,
    price_change_percentage_7d:
      response.data.market_data.price_change_percentage_7d,
    price_change_percentage_14d:
      response.data.market_data.price_change_percentage_14d,
    price_change_percentage_30d:
      response.data.market_data.price_change_percentage_30d,
    price_change_percentage_60d:
      response.data.market_data.price_change_percentage_60d,
    price_change_percentage_200d:
      response.data.market_data.price_change_percentage_200d,
    price_change_percentage_1y:
      response.data.market_data.price_change_percentage_1y,
    high_24h: response.data.market_data.high_24h.usd,
    low_24h: response.data.market_data.low_24h.usd
  };
}

module.exports = { fetchCoins, fetchCoinDetails };
