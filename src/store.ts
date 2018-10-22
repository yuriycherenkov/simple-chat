import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import redux from './redux';

const store = (
  createStore(
    redux,
    composeWithDevTools(applyMiddleware(reduxThunk)),
  )
);

export default store;
