import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Toggle extends PureComponent {
  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { children } = this.props;
    const { isOpen } = this.state;

    return children({
      toggle: this.toggle,
      isOpen,
    });
  }
}

export default Toggle;

Toggle.propTypes = {
  children: PropTypes.func.isRequired,
};
