import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import Toggle from '../Toggle';
import Logo from '../Logo';
import Form from '../Form';
import Portal from '../../Portal';

class Header extends Component {
  state = {
    isUserRegistered: false,
  }

  render() {
    const { isUserRegistered } = this.state;

    return (
      <div className="header">
        <div>Header</div>
        <Logo />
        <Toggle>
          {
            ({ toggle, isOpen }) => (
              <Fragment>
                {isOpen &&
                <Portal>
                  <Form toggle={toggle}>
                    {({ renderRegistration, renderLogin }) => (
                      <div className={isOpen ? 'form form__background' : 'form'}>
                        {isUserRegistered ? renderLogin : renderRegistration}
                      </div>
                        )}
                  </Form>
                </Portal>}
                <button onClick={toggle}>{isUserRegistered ? 'Login' : 'Registration'}</button>
              </Fragment>
            )
          }
        </Toggle>
      </div>
    );
  }
}

export default Header;

// Header.propTypes = {
//   children: React.PropTypes.element.isRequired,
// };
