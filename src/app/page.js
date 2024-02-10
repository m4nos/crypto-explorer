'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/coins/markets');
        console.log(response)
        setCoins(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>List of Coins</h1>
      <ul>
        {coins.map(coin => (
          <li key={coin.symbol} >
            <Link href={`/coins/${coin.id}`}>
              <div>Name: {coin.name}</div>
              <div>Symbol: {coin.symbol}</div>
              <div>Current Price: ${coin.current_price}</div>
              <div>Highest Price (24h): ${coin.high_24h}</div>
              <div>Lowest Price (24h): ${coin.low_24h}</div>
              <div>Price Change (24h): {coin.price_change_percentage_24h}%</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;