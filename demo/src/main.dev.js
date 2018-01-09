import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Main from './components/Main';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Main);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Main', () => {
    render(Main);
  });
}
