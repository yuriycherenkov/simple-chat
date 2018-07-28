import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatHistory from './ChatHistory';

const test = 'test';
export const Routes = {
  Index: '/',
};

const Router = () => (
  <Switch>
    <Route exact path={Routes.Index} component={ChatHistory} />
  </Switch>
);

export default Router;
