import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import Layout from './routes/Layout';

import Router from './routes';
import './main.scss';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
    <Layout>
      <Router />
    </Layout>
    </BrowserRouter>
  </Provider>
);

export default App;
