import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import ChatHistory from './ChatHistory';

const Routes = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={ChatHistory} />
    </Switch>
  </Layout>
);

export default Routes;
