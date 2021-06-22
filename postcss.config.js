const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cssImport = require('postcss-import');

module.exports = {
  plugins: [cssImport(), precss(), autoprefixer()],
};
