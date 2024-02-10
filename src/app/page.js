'use client';
import React, { useState } from 'react';
import CoinTable from '../components/CoinTable';
import AppHeader from '../components/AppHeader';
import { useQueryCoins } from '../queries/coins.query';

const CoinsOverviewPage = () => {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    page: 0,
  });
  const { data: coins, isFetching, isError, error } = useQueryCoins(pagination);

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;
  return (
    <>
      <AppHeader />
      <CoinTable coins={coins} />
    </>
  );
};

export default CoinsOverviewPage;