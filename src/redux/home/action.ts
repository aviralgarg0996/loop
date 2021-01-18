
import { CONTACTDATA_FAILURE, CONTACTDATA_SUCCESS, HOME_FAILURE, HOME_SUCCESS, MasterDataActionType } from './types';
import { Dispatch } from 'redux';
import API_PATH from '../../services/api-service/api-path';
import API from '../../services/api-service/api';
import { IExpertise } from '../../utils/models/master-data/response.model';
import { IHomeItem } from '../../utils/models/other.model';

 

export function homeSuccess(data: IHomeItem ): any  {
  return {
    type: HOME_SUCCESS,
    payload:  data
  }
}

export function homeFailure(): any {
  return {
    type: HOME_FAILURE,
  }
}

export function contactSuccess(data: IHomeItem ): any  {
  return {
    type: CONTACTDATA_SUCCESS,
    payload:  data
  }
}

export function contactFailure(): any {
  return {
    type: CONTACTDATA_FAILURE,
  }
}
 

export const homeData = () =>  (dispatch: Dispatch) => {
    return new Promise(async(resolve, reject) => {
      try {
        let data = await API().get<IHomeItem>(API_PATH.HOME_DATA );
        dispatch(homeSuccess(data.data));
      } catch (error) {
        dispatch(homeFailure());
      }
    });
}

export const contactData = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get<IHomeItem>(API_PATH.CONTACT_DATA);
      dispatch(contactSuccess(data.data));
    } catch (error) {
      dispatch(contactFailure());
    }
  });
}