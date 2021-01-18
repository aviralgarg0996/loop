 import { IMasterDataAuth } from '../master-data/types';
import {  SUBSCRIPTION_SUCCESS, SUBSCRIPTION_FAILURE } from './types';

const initialState  = {
    data: []
}

export const SubscriptionReducer = (state= initialState, action: any) : any => {
   
    switch(action.type){
        case SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                data: action.payload.data
            }
        case SUBSCRIPTION_FAILURE:
            return {
                ...state,
                data: []
            }
        default:
           return state;    
    }

}