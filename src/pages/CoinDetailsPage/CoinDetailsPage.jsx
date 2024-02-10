'use client';
import React, { useEffect, useState } from 'react';
import { useQueryCoinDetails } from '../../queries/coins.query';

const CoinDetailsPage = ({ params }) => {
  const {
    data: coinDetails,
    isFetching,
    isError,
    error,
  } = useQueryCoinDetails(params.coinId);

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;

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

export default CoinDetailsPage;
