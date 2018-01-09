const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_DEV = (process.env.NODE_ENV || 'development') === 'development';
function hotInject(path) {
  return IS_DEV ? ['react-hot-loader/patch', path.replace(/\.js$/, '.dev.js')] : [path];
}

module.exports = {
  entry: {
    main: hotInject(path.resolve('./demo/src/main.js')),
  },
  output: {
    path: path.resolve('./demo/dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?filenameRelative=' + path.resolve('./'),
        exclude: /(node_modules)|(demo)/,
      },
      {
        test: /\.js$/,
        loader: `babel-loader?extends=${path.resolve('./demo/.babelrc')}&sourceRoot=${path.resolve(
          './'
        )}`,
        include: path.resolve('./demo'),
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader?module&importLoaders=1', 'postcss-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: path.resolve('demo/src/index.html') })],
  devtool: IS_DEV ? '#eval-source-map' : 'source-map',
  devServer: {
    hot: true,
    publicPath: '/',
  },
  context: __dirname,
};
