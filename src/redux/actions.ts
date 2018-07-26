import { createAction } from 'typesafe-actions';

export const initState = createAction<string>('INIT_STATE');
export const someOtherAction = createAction<string>('SOME_OTHER_ACTION');
