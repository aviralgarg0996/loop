
import {  SUBSCRIPTION_FAILURE, SUBSCRIPTION_SUCCESS } from './types';
import { Dispatch } from 'redux';
import API_PATH from '../../services/api-service/api-path';
import API from '../../services/api-service/api';
import { IExpertise } from '../../utils/models/master-data/response.model';
import { IHomeItem, IHowItWorkItem, SubscriptionItem } from '../../utils/models/other.model';
import { HOWITWORK_FAILURE } from '../how-it-work/types';

 

 
export function subscriptionSuccess(data: SubscriptionItem ): any  {
  return {
    type: SUBSCRIPTION_SUCCESS,
    payload:  data
  }
}

export function subscriptionFailure(): any {
  return {
    type: SUBSCRIPTION_FAILURE,
  }
}
 
 

export const subData = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get<IHomeItem>(API_PATH.SUBSCRIPTION_DATA );
      
      
      dispatch(subscriptionSuccess(data.data));
      
    } catch (error) {
      dispatch(subscriptionFailure());
    }
  });
}