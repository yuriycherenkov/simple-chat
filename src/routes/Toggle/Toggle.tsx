import * as React from 'react';

interface InjectedCounterProps {
  toggle(): void;
  isOpen: boolean;
}
interface IToggleProps {
  children(props: InjectedCounterProps): JSX.Element;
}
interface IToggleState {
  isOpen: boolean;
}

class Toggle extends React.PureComponent<IToggleProps, IToggleState> {
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

