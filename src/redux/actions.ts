import { createAction } from 'typesafe-actions';

export const initState = createAction<string>('INIT_STATE');
export const getUsers = createAction<string>('GET_USERS');

export const dispatch = {
  initState,
  getUsers,
};
