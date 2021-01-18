 import { IExpertise, IGenre, IExpertiseItem, IGenreItem } from '../../utils/models/master-data/response.model';
export const MY_NETWORK_SUCCESS = 'MY_NETWORK_SUCCESS';
export const MY_NETWORK_FAILURE = 'MY_NETWORK_FAILURE';

export const NETWORK_ADD_SUCCESS = 'NETWORK_ADD_SUCCESS';
export const NETWORK_ADD_FAILURE = 'NETWORK_ADD_FAILURE';

export const NETWORK_REMOVE_SUCCESS = 'NETWORK_REMOVE_SUCCESS';
export const NETWORK_REMOVE_FAILURE = 'NETWORK_REMOVE_FAILURE';
 

interface MyNetworkSuccessAction {
  type: typeof MY_NETWORK_SUCCESS,
  payload: any[]
}

interface MyNetworkFailureAction {
    type: typeof MY_NETWORK_FAILURE
}

interface AddNetworkSuccessAction {
  type: typeof NETWORK_ADD_SUCCESS,
  payload: any
}

interface AddNetworkFailureAction {
    type: typeof NETWORK_ADD_FAILURE
}

interface RemoveNetworkSuccessAction {
  type: typeof NETWORK_REMOVE_SUCCESS,
  payload: any
}

interface RemoveNetworkFailureAction {
    type: typeof NETWORK_REMOVE_FAILURE
}

export type NetworkActionType = RemoveNetworkFailureAction | RemoveNetworkSuccessAction | AddNetworkFailureAction | AddNetworkSuccessAction | MyNetworkSuccessAction | MyNetworkFailureAction ;