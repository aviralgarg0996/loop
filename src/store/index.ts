import { createStore, applyMiddleware } from 'redux';
import { createHashHistory } from 'history';

import { composeEnhancers } from './utils';
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';
  

// configure middlewares
export const history = createHashHistory({
  hashType: 'slash',
  getUserConfirmation: (message, callback) => callback(window.confirm(message))
});

// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(thunk));

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer(history), initialState, enhancer);

// export store singleton instance
export default store;
