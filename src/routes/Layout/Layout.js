import React from 'react';
import PropTypes from 'prop-types';

const Layout = (props) => {
  const { children } = props;

  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
