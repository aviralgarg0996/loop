
import {  HOWITWORK_FAILURE, HOWITWORK_SUCCESS, MasterDataActionType } from './types';
import { Dispatch } from 'redux';
import API_PATH from '../../services/api-service/api-path';
import API from '../../services/api-service/api';
import { IExpertise } from '../../utils/models/master-data/response.model';
import { IHomeItem, IHowItWorkItem } from '../../utils/models/other.model';

 

 
export function howItWorkSuccess(data: IHowItWorkItem ): any  {
  return {
    type: HOWITWORK_SUCCESS,
    payload:  data
  }
}

export function howItWorkFailure(): any {
  return {
    type: HOWITWORK_FAILURE,
  }
}
 
 

export const howItWorkData = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get<IHomeItem>(API_PATH.HOWITWORK_DATA );
      
      
      dispatch(howItWorkSuccess(data.data));
      
    } catch (error) {
      dispatch(howItWorkFailure());
    }
  });
}