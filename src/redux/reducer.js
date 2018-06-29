import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = [
  'initial state',
];

export default handleActions({
  [actions.initState]: state => state,
}, initialState);
