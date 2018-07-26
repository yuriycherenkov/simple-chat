import * as React from 'react';
import Header from '../Header';

interface IToggleProps {
  children: JSX.Element;
}

const Layout = (props: IToggleProps) => {
  const { children } = props;

  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;

