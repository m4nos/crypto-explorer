
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CoinDetails = ({ params }) => {
  const { coinId } = params
  const [coinDetails, setCoinDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/coins/${coinId}`
        );
        setCoinDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };
    if (coinId) {
      fetchCoinDetails();
    }
  }, [coinId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(coinDetails);

  return (
    <div>
      <h1>{coinDetails.name}</h1>
      <div>Current Price: ${coinDetails.current_price}</div>
      <div>Description: {coinDetails.description}</div>
      <div>Price Change (24h): {coinDetails.price_change_percentage_24h}%</div>
      {/* Add more details as needed */}
    </div>
  );
};

export default CoinDetails;
