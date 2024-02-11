'use client';
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Link from 'next/link';
import styled from 'styled-components';
import PaginationButtons from './PaginationButtons';
import { useState } from 'react';
import { useQueryCoins } from '../queries/coins.query';

const StyledTableContainer = styled(TableContainer)`
  overflow: auto;
  width: auto;
  margin: 2rem 10rem;
  background-color: #373737;
  color: white;
`;

const StyledTableCell = styled(TableCell)`
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 800;
  color: white;
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #313131;
    text-decoration: none;
  }
`;

const initialPagination = {
  pageSize: 10,
  page: 1,
};

const CoinTable = () => {
  const [pagination, setPagination] = useState(initialPagination);
  const { data: coins, isFetching, isError, error } = useQueryCoins(pagination);

  if (isFetching) return <LinearProgress />;
  if (isError) return <div>Error: {error}</div>;
  return (
    <>
      <StyledTableContainer component={Paper}>
        <Table aria-label="coins table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Symbol</StyledTableCell>
              <StyledTableCell>Current Price</StyledTableCell>
              <StyledTableCell>1h</StyledTableCell>
              <StyledTableCell>24h high</StyledTableCell>
              <StyledTableCell>24h low</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map((coin) => (
              <StyledTableRow
                component={Link}
                href={`/coins/${coin.id}`}
                key={coin.id}
              >
                <StyledTableCell>{coin.name}</StyledTableCell>
                <StyledTableCell>{coin.symbol}</StyledTableCell>
                <StyledTableCell>{coin.current_price}</StyledTableCell>
                <StyledTableCell>{coin.high_24h}</StyledTableCell>
                <StyledTableCell>{coin.low_24h}</StyledTableCell>
                <StyledTableCell>
                  {coin.price_change_percentage_24h}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <PaginationButtons
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

export default CoinTable;
