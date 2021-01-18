import { reducers } from './../redux/index';
 import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

 const rootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history), ...reducers
  });

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
