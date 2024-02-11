'use client';
import {
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

const StyledTableContainer = styled(TableContainer)`
  overflow: auto;
`;

const StyledTableCell = styled(TableCell)`
  padding: 16px;
  font-size: 14px;
`;

const StyledTableRow = styled(TableRow)`
  text-decoration: none;
  &:hover {
    background-color: wheat;
  }
`;

const CoinTable = ({ coins }) => (
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
);

export default CoinTable;
