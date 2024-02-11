'use client';
import React, { useCallback, useState } from 'react';
import CoinTable from '../components/CoinTable';
import AppHeader from '../components/AppHeader';
import { useQueryCoins } from '../queries/coins.query';
import PaginationButtons from '../components/PaginationButtons';
import { SpaceBar } from '@mui/icons-material';

const initialPagination = {
  pageSize: 10,
  page: 1,
}

const CoinsOverviewPage = () => {
  const [pagination, setPagination] = useState(initialPagination);
  const { data: coins, isFetching, isError, error } = useQueryCoins(pagination);

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;
  console.log(pagination);

  return (
    <>
      <AppHeader />
      <CoinTable coins={coins} />

      <SpaceBar />
      <PaginationButtons pagination={pagination} setPagination={setPagination} />
    </>
  );
};

export default CoinsOverviewPage;