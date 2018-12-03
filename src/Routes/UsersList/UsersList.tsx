import * as React from 'react';
import styledComponents from 'styled-components';

interface IUsers {
  name: string;
  id: string;
}

interface IProps {
  users: IUsers[];
}

const UsersListWrapper = styledComponents.div`
    flex: 1 0 30%;
`;

const UsersList: React.SFC<IProps> = (props) => {
  const renderProps = () => {
    return props.users.map((user: IUsers, index: number) =>
      <div key={index}>{user.name}</div>
    );
  };

  return (
    <UsersListWrapper>
      <div>
        <div>Users: </div>
        <div>{renderProps()}</div>
      </div>
    </UsersListWrapper>
  );
};

export default UsersList;
