export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOADING = 'LOADING'
export const VOX_LOADING = 'VOX_LOADING'

export interface User {
  id: number,
  first_name: string,
  last_name: string,
  user_id: string,
  email: string,
  email_verified_at: string,
  comments: string,
  comments_date: string,
  user_type: number,
  active: string,
  photo: string,
  description: string,
  credits: string,
  subscription_id: string,
  status: string,
  last_login_at: string,
  online: string,
  user_status_id: string,
}

export interface AuthState {
  user?: User,
  token?: string,
  loading?: boolean,
  vox_loading?: boolean,
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS
  payload: { user: User, token: string }
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE
}

interface LoadingAction {
  type: typeof LOADING
  loading: boolean
}

interface VoxLoadingAction {
  type: typeof VOX_LOADING
  vox_loading: boolean
}

export type AuthActionType = LoadingAction | LoginSuccessAction | LoginFailureAction | VoxLoadingAction;