import { handleActions, createAction } from 'redux-actions';
import * as actions from './ducks';

interface IUsers {
  name: string;
  id: string;
}

interface IState {
  users: IUsers[];
}

/* actions */
export const getUsers = createAction<string>('GET_USERS');
export const setUsers = createAction<IUsers[], IUsers[]>('SET_USERS', (users): IUsers[] => users);

/* selectors */
export const select = {
  state: (state: IState) => state,
  users: (state: IState) => state.users,
};

export const dispatch = {
  getUsers,
  setUsers,
};

const initialState: IState = {
  users: [],
};

export const reducer = handleActions<IState, IUsers>({
  [actions.setUsers.toString()]: (state: IState, action: any) => {
    return ({
      users: [
        ...action.payload,
        ...state.users,
      ],
    });
  },
}, initialState);
