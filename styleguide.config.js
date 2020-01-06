const path = require('path');

module.exports = {
  webpackConfig: require('./webpack/webpack.config.dev.js'),
  moduleAliases: {
    'react-date-range': path.resolve(__dirname, 'src'),
  },
};
