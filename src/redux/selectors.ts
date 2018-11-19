interface IUsers {
  name: string;
  id: string;
}

interface IState {
  users: IUsers;
}

export const select = {
  state: (state: IState) => state,
  users: (state: IState) => state.users,
};
