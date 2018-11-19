import * as React from 'react';

import './style.scss';

interface InjectedProps {
  renderRegistration: () => JSX.Element;
  renderLogin: () => JSX.Element;
  closeModal: (e: React.MouseEvent<HTMLElement>) => void;
}

interface IToggleProps {
  children(props: InjectedProps): JSX.Element;
  toggle(): void;
}

class Form extends React.PureComponent<IToggleProps> {
  constructor(props: Readonly<IToggleProps>) {
    super(props);

    this.renderRegistration = this.renderRegistration.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
  }

  onClick = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
  };

  onClose = (e: React.MouseEvent<HTMLElement>): void => {
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
      renderRegistration: this.renderRegistration,
      renderLogin: this.renderLogin,
      closeModal: this.onClose,
    });
  }
}

export default Form;
