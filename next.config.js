/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
    '@mui/material',
    '@mui/system',
    '@mui/icons-material', // If @mui/icons-material is being used
]);

module.exports = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        });
        return config;
    },
};