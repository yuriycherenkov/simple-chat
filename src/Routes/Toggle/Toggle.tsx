import * as React from 'react';

interface InjectedProps {
  isOpen: boolean;
  toggle(): void;
}
interface IToggleProps {
  children(props: InjectedProps): JSX.Element;
}
interface IToggleState {
  isOpen: boolean;
}

class Toggle extends React.PureComponent<IToggleProps, IToggleState> {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { children } = this.props;
    const { isOpen } = this.state;

    return children({
      isOpen,
      toggle: this.toggle,
    });
  }
}

export default Toggle;
