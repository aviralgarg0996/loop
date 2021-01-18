import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  User,
  AuthActionType,
  LOADING,
  VOX_LOADING,
} from './types';
import API from '../../services/api-service/api';
import API_PATH from '../../services/api-service/api-path';
import { Dispatch } from 'redux';
import {
  BaseResponse,
  Auth,
  ContactUs,
} from '../../utils/models/response.model';
import { ContactUsReq } from '../../utils/models/other.model';
import { voxService } from '../../services/voximplant-service/vox.service';
import MessengerService from '../../services/voximplant-service/messenger.service';
import { getVoxUsersSuccess, getVoxUsersFailure, getCurrentConversation, loadAllConversation } from '../user/action';
import store, { history } from '../../store';

const TOKEN_KEY = 'vox_token_a';
const REFRESH_TOKEN_KEY = 'vox_token_r';
const LOGIN = 'vox_login';
const TIME_NOTIFICATION = 3000;

function setTokens(
  auth_token: { accessToken: string; refreshToken: string },
  login = ''
) {
  localStorage.setItem(TOKEN_KEY, auth_token.accessToken);
  localStorage.setItem(LOGIN, login);
  localStorage.setItem(REFRESH_TOKEN_KEY, auth_token.refreshToken);
}

// TypeScript infers that this function is returning SendMessageAction
export function loginSuccess(user: User, token: string): AuthActionType {
  return {
    type: LOGIN_SUCCESS,
    payload: { user, token },
  };
}

export function loginFailure(): AuthActionType {
  return { type: LOGIN_FAILURE };
}

export function loadingAction(loading: boolean): AuthActionType {
  return { type: LOADING, loading };
}

export function voxLoadingAction(vox_loading: boolean): AuthActionType {
  return { type: VOX_LOADING, vox_loading };
}

export const reloginVox = () => {
  if (!localStorage.getItem('token')) {
    return false;
  }
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem('vox_token_a');
      let userData = <any>localStorage.getItem('userData');
      if (token && userData) {
        userData = JSON.parse(userData);
        store.dispatch(voxLoadingAction(true));
        const login = await voxService.onLogin(
          {
            user: `${userData.email.replace(
              '@',
              '-loop-'
            )}@loop.cocoworth.voximplant.com`,
          },
          token
        ).catch((e:any)=> {
          console.log("auth error", e);
          localStorage.clear();
          voxService.get().disconnect();
          history.push('/sign-in');
        });
        if (login.result) {
          setTokens(login.tokens, userData.email.replace('@', '-loop-'));
          let messengerService = MessengerService.get();
          await messengerService
            .init()
            .then((data: any) => {
              console.log(
                'voximplant relogin messenger service initialize',
                data
              );
              store.dispatch(getVoxUsersSuccess(data));
              const {
                user: { currentConversationId },
              } = store.getState();
              // getCurrentConversation(currentConversationId);
              loadAllConversation(data.conversations, data.currentUser, data.users);
            })
            .catch((error: any) => {
              console.log(
                'voximplant messenger relogin service initialize failed',
                error
              );
              store.dispatch(getVoxUsersFailure());
            });
        } else {
          console.log('voximplant user relogin failure', login);
        }
        store.dispatch(voxLoadingAction(false));
      }
    } catch (error) {
      store.dispatch(voxLoadingAction(false));
      reject({ error: error });
    }
  });
};

export const onlineReceived = (userId: Number, online: boolean) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        user: { vox_users },
      } = store.getState();
      const updateData = vox_users.users.map((item: any) => {
        if (item.userId == userId) {
          return {
            ...item,
            online: online,
            timeStamp: new Date().getTime(),
          };
        } else if (
          item.timeStamp &&
          new Date().getTime() - item.timeStamp > TIME_NOTIFICATION
        ) {
          return {
            ...item,
            online: false,
            timeStamp: new Date().getTime(),
          };
        }
        return item;
      });
      store.dispatch(
        getVoxUsersSuccess({
          ...vox_users,
          users: updateData,
        })
      );
    } catch (error) {
      reject({ error: error });
    }
  });
};

export const login = (email: string, password: string) => (
  dispatch: Dispatch
): Promise<object> => {
  dispatch(loadingAction(true));
  return new Promise(async (resolve, reject) => {
    try {
      let data = await API().post<Auth>(API_PATH.LOGIN, { email, password });
      if (data.data.token) {
        const login = await voxService.onLogin(
          {
            user: `${email.replace(
              '@',
              '-loop-'
            )}@loop.cocoworth.voximplant.com`,
            password,
          },
          null
        );
        if (login.result) {
          setTokens(login.tokens, email.replace('@', '-loop-'));
          let messengerService = MessengerService.get();
          dispatch(voxLoadingAction(true));
          await messengerService
            .init()
            .then((data: any) => {
              console.log('voximplant messenger service initialize', data);
              dispatch(getVoxUsersSuccess(data));
              dispatch(voxLoadingAction(false));
              const {
                user: { currentConversationId },
              } = store.getState();
              // getCurrentConversation(currentConversationId);
              loadAllConversation(data.conversations, data.currentUser, data.users);
            })
            .catch((error: any) => {
              console.log(
                'voximplant messenger service initialize failed',
                error
              );
              dispatch(getVoxUsersFailure());
              dispatch(voxLoadingAction(false));
            });
        } else {
          console.log('voximplant user login failure', login);
        }
        dispatch(loadingAction(false));
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('userData', JSON.stringify(data.data.data));
        dispatch(loginSuccess(data.data.data, data.data.token));
        resolve({ data: data.data.data });
      }
    } catch (error) {
      dispatch(loadingAction(false));
      reject({ error: error });
    }
  });
};

export const register = (
  email: string,
  password: string,
  password_confirmation: string
) => (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().post<BaseResponse>(API_PATH.REGISTER, {
        email,
        password,
        password_confirmation,
        email_verified: true,
      });
      if (data.data) {
        const userName = email.replace('@', '-loop-');
        const response = await fetch(
          `https://api.voximplant.com/platform_api/AddUser/?api_key=866d22ab-e2fc-4b44-a054-ba18bf59c3ec&application_id=10005576&user_name=${userName}&user_display_name=${userName}&user_password=${password}&account_id=3758024`
        );
        if (response) {
          dispatch(loadingAction(false));
          resolve({ data: data.data });
        }
      }
    } catch (error) {
      dispatch(loadingAction(false));
      reject({ error: error });
    }
  });
};

export const logout = () => (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().get<Auth>(API_PATH.LOGIN);
      voxService.get().disconnect();
      dispatch(loadingAction(false));
      dispatch(loginFailure());
      localStorage.clear();
      resolve({ data: data.data.data });
    } catch (error) {
      reject({ error: error });
    }
  });
};

export const contactUs = (contactUs: ContactUsReq) => (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().post<ContactUs>(API_PATH.CONTACT_US, contactUs);
      dispatch(loadingAction(false));
      resolve({ data: data.data.message });
    } catch (error) {
      dispatch(loadingAction(false));
      reject({ error: error });
    }
  });
};
