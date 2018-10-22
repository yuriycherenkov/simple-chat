import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatHistory from './ChatHistory/index';
import Layout from './Layout/index';

// interface IRoute extends Switch<React.Props<any> {

// }

const Routes: React.SFC<IRoute> = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={ChatHistory} />
    </Switch>
  </Layout>
);

export default Routes;
