'use strict';

const path = require('path');
const contentBase = path.resolve('./dist');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const settings = {
  HtmlWebpackPlugin: {
    template: './demo/src/index.html',
    inject: true,
  },
};

module.exports = {
  main: {
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(settings.HtmlWebpackPlugin),
      new MiniCssExtractPlugin(),
    ],

    entry: {
      'main.js': path.resolve('./demo/src/index.js'),
      //'styles': path.resolve('./src/styles.scss'),
      //'theme/default': path.resolve('./src/theme/default.scss'),
    },

    output: {
      filename: '[name]',
      path: contentBase,
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /(\.sass|\.scss)$/,
          use: [
            process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader'
          ],
        },
      ],
    },
    resolve: {
      alias: {
        'react-date-range': path.resolve(__dirname, 'src/'),
      },
    },
  },

  contentBase: contentBase,
};
