import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme/project1/theme';

const ThemeWrapper: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
