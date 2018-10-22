import { Component } from 'react';
import * as ReactDOM from 'react-dom';

const portalRoot = document.getElementById('portal');

class Portal extends Component {
  el: HTMLElement;

  constructor(props: any) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    if (portalRoot) {
      portalRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (portalRoot) {
      portalRoot.removeChild(this.el);
    }
  }

  render() {
    const { children } = this.props;

    return ReactDOM.createPortal(children, this.el);
  }
}

export default Portal;
