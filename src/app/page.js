'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';

const StyledDataGrid = styled(DataGrid)`
  background-color: wheat;
`

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    sortable: false,
  },
  {
    field: 'symbol',
    headerName: 'Symbol',
    sortable: false,
  },
  {
    field: 'current_price',
    headerName: 'Price',
    sortable: false,

  },
  {
    field: 'high_24h',
    headerName: 'highest 24h',
  },
  {
    field: 'low_24',
    headerName: 'lowest 24h',
  },
  {
    field: 'price_change_percentage_24h',
    headerName: 'change percentage',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
  },
];

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
      <StyledDataGrid
        rows={coins}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]} />
    </div>
  );
};

export default Home;