'use client';
import React from 'react';
import { Typography } from '@mui/material';
import Link from 'next/link';

const AppHeader = () => {
  return (
    <Typography
      style={{
        fontSize: '5rem',
        textAlign: 'center',
        fontFamily: 'system-ui',
        fontWeight: 800
      }}
    >
      <Link
        href="/"
        style={{ textDecoration: 'none', outline: 'none', color: 'inherit' }}
      >
        Crypto Explorer
      </Link>
    </Typography>
  );
};

export default AppHeader;
