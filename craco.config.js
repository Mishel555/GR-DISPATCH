const path = require('path');
// const Dotenv = require('dotenv-webpack');

module.exports = {
  webpack: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/components/pages'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@store': path.resolve(__dirname, 'src/store'),
      "@thunks": path.resolve(__dirname, 'src/store/thunks'),
      "@slices": path.resolve(__dirname, 'src/store/slices'),
      "@selectors": path.resolve(__dirname, 'src/store/selectors'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@types': path.resolve(__dirname, 'src/types'),
    },
    plugin: [
      // new Dotenv(),
    ],
  },
};
