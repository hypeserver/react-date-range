const path = require('path');
const { version } = require('./package');

module.exports = {
  title: 'react-date-range',
  showSidebar: false,
  require: [
    path.join(__dirname, './src/styles.scss'),
    path.join(__dirname, './src/theme/default.scss')
  ],
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.tsx');
    return `import { ${name} } from 'react-date-range';`;
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/ThemeWrapper')
  },
  skipComponentsWithoutExample: true,
  version,
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json'
  ).parse,
  ignore: [
    '**/assets/**',
    '**/data/**',
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    '**/*.style.{js,jsx,ts,tsx}'
  ],
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400',
        },
        {
          rel: 'stylesheet',
          href: './src/styles.scss',
        },
        {
          rel: 'stylesheet',
          href: './src/theme/default.scss',
        },
        {
          rel: 'stylesheet',
          href: './src/theme/demo.css',
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
  moduleAliases: {
    'react-date-range': path.resolve(__dirname, 'src/'),
  },
  sections: [
    {
      name: 'Components',
      sections: [
        // {
        //   components: 'src/components/Atoms/*/**.tsx',
        // },
        {
          components: 'src/components/DateRangePicker/*.js',
          // usageMode: 'hide',
        },
        {
          components: 'src/components/DateRange/*.js',
          // usageMode: 'hide',
        },
        {
          components: 'src/components/Calendar/*.js',
        },
        {
          components: 'src/components/DefinedRange/*.js',
        },
      ],
      sectionDepth: 0,
    }
  ]
};
