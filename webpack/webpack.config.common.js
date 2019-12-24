'use strict'

const path = require('path')
const contentBase = path.resolve('./dist')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const settings = {
  HtmlWebpackPlugin: {
    template: './demo/src/index.html',
    inject: true
  }
}

module.exports = {
  main: {
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(settings.HtmlWebpackPlugin),
      new ExtractTextPlugin('[name]')
    ],

    entry: {
      'js/main.js': path.resolve('./demo/src/index.js'),
      // 'js/main.js': path.resolve('./src/index.js'),
      //'css/main.css': path.resolve('./src/styles/index.scss')
    },

    output: {
      filename: '[name]',
      path: contentBase
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /(\.sass|\.scss)$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }
      ]
    }
  },

  contentBase: contentBase
}
