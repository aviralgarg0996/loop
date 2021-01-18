import { IGenre } from '../../utils/models/master-data/response.model';
import { NetworkActionType, MY_NETWORK_SUCCESS, MY_NETWORK_FAILURE, NETWORK_ADD_SUCCESS, NETWORK_ADD_FAILURE, NETWORK_REMOVE_SUCCESS, NETWORK_REMOVE_FAILURE } from './types';
import { Dispatch } from 'redux';
import API_PATH from '../../services/api-service/api-path';
import API from '../../services/api-service/api';
import { loadingAction } from '../auth/action';
import { IExpertise } from '../../utils/models/master-data/response.model';

export function myNetworkSuccess(data: any[] ): NetworkActionType  {
  return {
    type: MY_NETWORK_SUCCESS,
    payload:  data
  }
}

export function myNetworkFailure(): NetworkActionType {
  return {
    type: MY_NETWORK_FAILURE,
  }
}
export function addNetworkSuccess(data: any ): NetworkActionType  {
  return {
    type: NETWORK_ADD_SUCCESS,
    payload:  data
  }
}

export function addNetworkFailure(): NetworkActionType {
  return {
    type: NETWORK_ADD_FAILURE,
  }
}
export function removeNetworkSuccess(data: any ): NetworkActionType  {
  return {
    type: NETWORK_REMOVE_SUCCESS,
    payload:  data
  }
}

export function removeNetworkFailure(): NetworkActionType {
  return {
    type: NETWORK_REMOVE_FAILURE,
  }
}
 
export const myNetwork = (showloader = true) =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(showloader));
      let data = await API().get(API_PATH.MY_NETWORK );
      dispatch(loadingAction(false));
      dispatch(myNetworkSuccess(data.data.data));
    } catch (error) {
      dispatch(loadingAction(false));
      dispatch(myNetworkFailure());
    }
  });
}
export const addNetwork = (userId: string) =>  (dispatch: Dispatch) => {
    return new Promise(async(resolve, reject) => {
      try {
        let data = await API().get(API_PATH.ADD_NETWORK + '/' + userId );
        dispatch(addNetworkSuccess(data.data));
        resolve(data)
      } catch (error) {
        reject(error)
        dispatch(addNetworkFailure());
      }
    });
}
export const removeNetwork = (userId: string ) =>  (dispatch: Dispatch) => {
    return new Promise(async(resolve, reject) => {
      try {
        let data = await API().get(API_PATH.REMOVE_NETWORK + '/' + userId  );
        dispatch(removeNetworkSuccess(data.data));
        resolve(data)
      } catch (error) {
        reject(error)
        dispatch(removeNetworkFailure());
      }
    });
}

export const acceptRequest = (userId: string) => (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get(API_PATH.ACCEPT_REQUEST + '/' + userId  );
      //dispatch(removeNetworkSuccess(data.data));
      resolve(data)
    } catch (error) {
      reject(error)
      //dispatch(removeNetworkFailure());
    }
  });
}

export const cancelRequest = (userId: string) => (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get(API_PATH.CANCEL_REQUEST + '/' + userId  );
      resolve(data)
    } catch (error) {
      reject(error)
    }
  });
}

export const rejectRequest = (userId: string) => (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get(API_PATH.REJECT_REQUEST + '/' + userId  );
      //dispatch(removeNetworkSuccess(data.data));
      resolve(data)
    } catch (error) {
      reject(error)
      //dispatch(removeNetworkFailure());
    }
  });
}