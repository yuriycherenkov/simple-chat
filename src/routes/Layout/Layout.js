import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';

const Layout = (props) => {
  const { children } = props;

  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
