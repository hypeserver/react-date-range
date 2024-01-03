const path = require('path');
const isDEV = process.env.NODE_ENV === 'development';
const moduleSource = isDEV ? 'src' : 'src';

module.exports = {
  title: '@iroomit/react-date-range',
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
          href: './demo/styles.css',
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
    return `import { ${name} } from '@iroomit/react-date-range';`;
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
    LogoRenderer: path.join(__dirname, 'demo/components/Logo'),
    StyleGuideRenderer: path.join(__dirname, 'demo/components/StyleGuide'),
    SectionsRenderer: path.join(__dirname, 'demo/components/SectionsRenderer'),
  },
  moduleAliases: {
    'react-date-range/dist': path.resolve(__dirname, moduleSource),
    'react-date-range': path.resolve(__dirname, moduleSource),
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        },
        {
        test: /\.css$/,
        use: [
        'style-loader',
        {
        loader: 'css-loader',
        options: {
        modules: true,
        },
        },
        ],
        },
        {
        test: /\.svg$/,
        type: 'asset/resource',
        },
        ],
    },
    devServer: {
      static: {
        directory: __dirname
      }
    }
  },
  pagePerSection: false,
  sections: [
    {
      name: 'Getting Started',
      content: 'demo/README.md',
      sectionDepth: 0,
    },
    {
      name: 'Components',
      sections: [
        {
          components: () => ['src/components/DateRangePicker/index.js'],
          usageMode: 'hide',
        },
        {
          components: () => ['src/components/DateRange/index.js'],
          usageMode: 'hide',
        },
        {
          components: () => ['src/components/Calendar/index.js'],
        },
        {
          components: () => ['src/components/DefinedRange/index.js'],
        },
      ],
      sectionDepth: 0,
    },
  ],
};
