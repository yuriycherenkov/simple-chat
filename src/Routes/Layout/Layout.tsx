import * as React from 'react';
import Header from '../Header';

interface ILayout {
  children: JSX.Element;
}

const Layout = (props: ILayout) => {
  const { children } = props;

  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
