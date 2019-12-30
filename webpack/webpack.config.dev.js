'use strict'

const common = require('./webpack.config.common')

console.log('[Webpack] Use dev configuration\n')

module.exports = Object.assign(
  {
    mode: 'development',
    devtool: '#source-map',
    devServer: {
      open: true, // to open the local server in browser
      contentBase: common.contentBase //serve from 'dist' folder
    }
  },
  common.main
)
