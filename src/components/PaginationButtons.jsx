import {
  Box,
  ButtonGroup,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import React from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
  min-width: 5rem;
  outline: none;
  color: white;

  .MuiSelect-select {
    padding-left: 1.5rem;
  }
  .MuiSvgIcon-root {
    color: white;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.5) !important;
    border-width: 1px !important;
  }
`;

const PaginationButtons = ({ pagination, setPagination }) => {
  const handlePrevPage = () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: Math.max(prevPagination.page - 1, 1),
    }));
  };

  const handleNextPage = () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: prevPagination.page + 1,
    }));
  };

  const handlePageSize = (event) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      pageSize: Number(event.target.value),
    }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        paddingBottom: '2rem',
      }}
    >
      <IconButton
        onClick={handlePrevPage}
        disabled={pagination.page === 1}
        style={{ padding: '1rem' }}
      >
        <NavigateBeforeIcon sx={{ color: 'white' }} />
      </IconButton>
      <IconButton onClick={handleNextPage} style={{ padding: '1rem' }}>
        <NavigateNextIcon sx={{ color: 'white' }} />
      </IconButton>
      <FormControl>
        <InputLabel id="PageSize" style={{ color: 'white' }}>
          Page size
        </InputLabel>
        <StyledSelect
          value={pagination.pageSize}
          onChange={handlePageSize}
          label="Page size"
          labelId="PageSize"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </StyledSelect>
      </FormControl>
    </Box>
  );
};

export default PaginationButtons;
