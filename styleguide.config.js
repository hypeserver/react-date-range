const path = require('path');

module.exports = {
  ignore: ['**/*.test.js', '**/DateInput/*', '**/DayCell/*', '**/Month/*', '**/InputRangeField/*'],
  title: 'react-date-range',
  showSidebar: false,
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400',
        },
        {
          rel: 'stylesheet',
          href: './dist/styles.css',
        },
        {
          rel: 'stylesheet',
          href: './dist/theme/default.css',
        },
        {
          rel: 'stylesheet',
          href: './styleguide/styles.css',
        },
      ],
    },
  },
  theme: {
    baseBackground: '#fdfdfc',
    link: '#274e75',
    linkHover: '#90a7bf',
    border: '#e0d2de',
    font: ['Open Sans'],
    fontFamily: {
      base: '"Open Sans", "Helvetica", sans-serif',
    },
  },

  getComponentPathLine(componentPath) {
    const arr = componentPath.split('/');
    const name = arr[arr.length - 2];
    return `import { ${name} } from 'react-date-range';`;
  },

  styles: function styles(theme) {
    return {
      Playground: {
        preview: {
          paddingLeft: 0,
          paddingRight: 0,
          borderWidth: [[0, 0, 1, 0]],
          borderRadius: 0,
        },
      },
      Code: {
        code: {
          // make inline code example appear the same color as links
          color: theme.color.link,
          fontSize: 14,
        },
      },
    };
  },
  // Override Styleguidist components
  styleguideComponents: {
    LogoRenderer: path.join(__dirname, 'styleguide/components/Logo'),
    StyleGuideRenderer: path.join(__dirname, 'styleguide/components/StyleGuide'),
    SectionsRenderer: path.join(__dirname, 'styleguide/components/SectionsRenderer'),
  },
  moduleAliases: {
    'react-date-range/dist': path.resolve(__dirname, 'dist'),
    'react-date-range': path.resolve(__dirname, 'dist'),
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules',
        },
        {
          test: /\.svg$/,
          loader: 'url-loader',
        },
      ],
    },
  },
};
