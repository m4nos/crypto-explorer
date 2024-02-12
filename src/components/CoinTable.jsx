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
import { useEffect, useState } from 'react';
import { useQueryCoins } from '../queries/coins.query';
import { formatNumber, percentageConverter } from '../app/utils/format-numbers';

export const StyledTableContainer = styled(TableContainer)`
  overflow: auto;
  width: auto;
  margin: 2rem 10rem;
  background-color: #e0e0e0;
  color: #373737;

  @media (max-width: 768px) {
    margin: 2rem 0;
  }
`;

export const StyledTableCell = styled(TableCell)`
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 800;
  color: #373737;
`;

export const StyledTableRow = styled(TableRow)`
  text-decoration: none;

  &:hover {
    background-color: #d5d5d5;
  }
`;

const initialPagination = {
  pageSize: 10,
  page: 1,
};

const breakpoint = 1200;

const CoinTable = () => {
  const [pagination, setPagination] = useState(initialPagination);
  const [isDesktop, setDesktop] = useState(
    typeof window === 'undefined' ? false : window.innerWidth > 1450
  );

  const { data: coins, isFetching, isError, error } = useQueryCoins(pagination);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1450);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

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
              {isDesktop && (
                <>
                  <StyledTableCell>24h high</StyledTableCell>
                  <StyledTableCell>24h low</StyledTableCell>
                  <StyledTableCell>24h %</StyledTableCell>
                </>
              )}
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
                <StyledTableCell>{coin.symbol.toUpperCase()}</StyledTableCell>
                <StyledTableCell>
                  {formatNumber(coin.current_price)}
                </StyledTableCell>
                {isDesktop && (
                  <>
                    <StyledTableCell>
                      {formatNumber(coin.high_24h)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatNumber(coin.low_24h)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {percentageConverter(coin.price_change_percentage_24h)}
                    </StyledTableCell>
                  </>
                )}
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
