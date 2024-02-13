'use client';
import React from 'react';
import { useQueryCoinDetails } from '../../../queries/coins.query';
import {
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { formatNumber, percentageConverter } from '../../utils/format-numbers';
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow
} from '../../../components/CoinTable';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoinDetailsPage = ({ params }) => {
  const {
    data: coinDetails,
    isFetching,
    isError,
    error
  } = useQueryCoinDetails(params.coinId);

  if (isFetching) return <LinearProgress />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Box>
      <Typography
        style={{ margin: '0 5rem', fontSize: '5rem', fontWeight: '800' }}
      >
        {coinDetails.name}
      </Typography>
      <Paper
        elevation={3}
        style={{
          margin: '0 5rem',
          padding: '2rem',
          backgroundColor: '#ececec'
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: coinDetails.description }} />
      </Paper>
      <StyledBox display="flex">
        <List>
          <ListItem>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <Typography>
              Current price:
              <ListItemText primary={formatNumber(coinDetails.current_price)} />
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ArrowDownwardIcon />
            </ListItemIcon>
            <Typography>
              24h low:
              <ListItemText primary={formatNumber(coinDetails.low_24h)} />
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ArrowUpwardIcon />
            </ListItemIcon>
            <Typography>
              24h high:
              <ListItemText primary={formatNumber(coinDetails.high_24h)} />
            </Typography>
          </ListItem>
        </List>

        <StyledTableContainer component={Paper}>
          <Table aria-label="coins table">
            <TableHead>
              <TableRow>
                <StyledTableCell>24 hours</StyledTableCell>
                <StyledTableCell>7 days</StyledTableCell>
                <StyledTableCell>14 days</StyledTableCell>
                <StyledTableCell>1 month</StyledTableCell>
                <StyledTableCell>2 months</StyledTableCell>
                <StyledTableCell>200 days</StyledTableCell>
                <StyledTableCell>1 year</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>
                  {percentageConverter(coinDetails.price_change_percentage_24h)}
                </StyledTableCell>
                <StyledTableCell>
                  {percentageConverter(coinDetails.price_change_percentage_7d)}
                </StyledTableCell>
                <StyledTableCell>
                  {percentageConverter(coinDetails.price_change_percentage_14d)}
                </StyledTableCell>
                <StyledTableCell>
                  {percentageConverter(coinDetails.price_change_percentage_30d)}
                </StyledTableCell>
                <StyledTableCell>
                  {percentageConverter(coinDetails.price_change_percentage_60d)}
                </StyledTableCell>
                <StyledTableCell>
                  {percentageConverter(
                    coinDetails.price_change_percentage_200d
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  {percentageConverter(coinDetails.price_change_percentage_1y)}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </StyledTableContainer>
      </StyledBox>
    </Box>
  );
};

export default CoinDetailsPage;
