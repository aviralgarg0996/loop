import {
  AuthState,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AuthActionType,
  LOADING,
  VOX_LOADING,
} from './types';
import { boolean } from 'yup';

const initialState: AuthState = {
  user: undefined,
  token: undefined,
  loading: false,
  vox_loading: false,
};

export const AuthReducer = (
  state = initialState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: undefined,
        token: undefined,
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case VOX_LOADING:
      return {
        ...state,
        vox_loading: action.vox_loading,
      };
    default:
      return state;
  }
};
