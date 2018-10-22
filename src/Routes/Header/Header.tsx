import * as React from 'react';
import Toggle from '../Toggle';
import Logo from '../Logo';
import Form from '../Form';
import Portal from '../../Portal';

interface Iprops {
}

interface Istate {
  isUserRegistered: boolean;
}

class Header extends React.Component<Iprops, Istate> {
  state = {
    isUserRegistered: false,
  };

  render() {
    const { isUserRegistered } = this.state;

    return (
      <div className="header">
        <div>Header</div>
        <Logo />
        <Toggle>
          {
            ({ toggle, isOpen }) => (
              <React.Fragment>
                {isOpen &&
                <Portal>
                  <Form toggle={toggle}>
                    {({ renderRegistration, renderLogin }) => (
                      <div className={isOpen ? 'form form__background' : 'form'}>
                        {isUserRegistered ? renderLogin() : renderRegistration()}
                      </div>
                        )}
                  </Form>
                </Portal>}
                <button onClick={toggle}>{isUserRegistered ? 'Login' : 'Registration'}</button>
              </React.Fragment>
            )}
        </Toggle>
      </div>
    );
  }
}

export default Header;
