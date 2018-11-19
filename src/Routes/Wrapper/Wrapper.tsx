import * as React from 'react';
import { fetchData } from '../../redux/sideEffects';
import { fetchUsersOptions } from '../../constants';

interface IUser {
  name: string;
  id: string;
}

export interface InjectedProps {
  hasError: boolean;
  isLoading: boolean;
  users: IUser[];
}

interface IState extends InjectedProps {}

interface IWrapper {
  children(props: InjectedProps): JSX.Element;
}

class Wrapper extends React.Component<IWrapper, IState> {
  state = {
    hasError: false,
    isLoading: false,
    users: [],
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    if (!this.state.isLoading) {
      this.setState({ hasError: false, isLoading: true });

      this.fetchUsers();
    }
  }

  componentDidUpdate(_prevProps: any, _prevState: any) {
    const { hasError, isLoading, users } = this.state;
    const canLoad = !hasError && !isLoading;

    if (canLoad && users && users.length) {

      const areEqualUsers = users.every((user: IUser, index: number) => {
        return (user.name === _prevState.users[index].name && user.id === _prevState.users[index].id);
      });

      if (!areEqualUsers) {
        this.fetchUsers();
      }
    }
  }

  fetchUsers = () => {
    fetchData(fetchUsersOptions)
      .then((response: any) => {
        this.setState({ users: response.data });
      })
      .then(() => this.setState({ isLoading: false }))
      .catch(() => {
        this.setState({ hasError: true, isLoading: false });
      });
  }

  render() {
    const { children } = this.props;
    const { hasError, isLoading, users } = this.state;

    return (
      children({
        hasError,
        isLoading,
        users,
      })
    );
  }
}

export default Wrapper;
