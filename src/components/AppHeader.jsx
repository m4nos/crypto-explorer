'use client';
import React from 'react';
import { Typography } from '@mui/material';

const AppHeader = () => {
  return (
    <Typography
      style={{
        fontSize: '8rem',
        textAlign: 'center',
        fontFamily: 'system-ui',
        fontWeight: 800,
      }}
    >
      Crypto Explorer
    </Typography>
  );
};

export default AppHeader;
