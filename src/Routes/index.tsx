import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Wrapper from './Wrapper';
import Layout from './Layout';
import ChatHistory from './ChatHistory';

// interface IRoute extends Switch<React.Props<any> {

// }

class Routes extends React.PureComponent<any> {

  render() {
    return (
      <Wrapper>
      {
        ({ isLoading, hasError }) => (
          <React.Fragment>
            {isLoading && <div>Loading...</div>}
            {hasError && <div>Error while loading data</div>}
            <Layout>
              <Switch>
                <Route exact path="/" component={ChatHistory} />
              </Switch>
            </Layout>
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}

export default Routes;
