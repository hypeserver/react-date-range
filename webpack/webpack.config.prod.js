'use strict'

const common = require('./webpack.config.common')

console.log('[Webpack] Use prod configuration\n')

module.exports = Object.assign(
  {
    //mode: 'production',
    mode: 'development',
    devtool: '#source-map',
  },
  common.main
)
