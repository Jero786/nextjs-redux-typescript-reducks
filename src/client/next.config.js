const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const { parsed: localEnv } = require('dotenv').config();

// next.js configuration
const nextConfig = {
    distDir: '../../dist',
};

const nextConfigTypescript = {
    webpack: config => {
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
        return config;
    },
};

module.exports = withPlugins([[withTypescript(), nextConfigTypescript], [withSass]], nextConfig);
