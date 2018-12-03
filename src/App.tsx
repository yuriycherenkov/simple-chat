import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import store from './store';

import Routes from './Routes';
import './main.scss';

const App = () => (
  <ThemeProvider theme={{}}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);

export default App;
