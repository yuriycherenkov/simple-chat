import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class Form extends PureComponent {
  constructor(props) {
    super(props);

    this.renderRegistration = this.renderRegistration.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
  }

  onClick = (e) => {
    e.preventDefault();
  };

  onClose = (e) => {
    e.preventDefault();
    this.props.toggle();
  };

  renderRegistration() {
    return (
      <div className="form__fields">
        <input className="form-control" placeholder="enter name" />
        <input className="form-control" placeholder="enter surname" />
        <input className="form-control" placeholder="enter user name" />
        <input className="form-control" placeholder="enter email" type="email" />
        <input className="form-control" placeholder="enter password" type="password" />

        <button onClick={this.onClick}>Submit</button>
        <button onClick={this.onClose}>Close</button>
      </div>
    );
  }

  renderLogin() {
    return (
      <div className="form__fields">
        <input className="form-control" placeholder="enter user name" />
        <input className="form-control" placeholder="enter password" type="password" />

        <button onClick={this.onClick}>Submit</button>
        <button onClick={this.onClose}>Close</button>
      </div>
    );
  }

  render() {
    const { children } = this.props;

    return children({
      renderRegistration: this.renderRegistration(),
      renderLogin: this.renderLogin(),
      closeModal: this.onClose,
    });
  }
}

export default Form;

Form.propTypes = {
  children: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

