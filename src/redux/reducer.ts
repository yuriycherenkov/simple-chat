import { handleActions } from 'redux-actions';
import * as actions from './actions';

interface IState {
  someState: string[];
}

const initialState: IState = {
  someState: ['initial state 1', 'initial state 2'],
};

// (state, action: Action<string>) =>

export default handleActions<IState>({
  [actions.initState.toString()]: (state: IState) => state,
}, initialState);
