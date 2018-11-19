import { handleActions } from 'redux-actions';
import * as actions from './actions';

interface IState {
  users: any[];
}

const initialState: IState = {
  users: [],
};

export default handleActions<IState>({
  [actions.initState.toString()]: (state: IState) => state,
}, initialState);
