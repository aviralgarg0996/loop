 import { IMasterDataAuth } from '../master-data/types';
import { MasterDataActionType, HOME_SUCCESS, HOME_FAILURE, CONTACTDATA_FAILURE, CONTACTDATA_SUCCESS } from './types';

const initialState  = {
    data: [],
    contact: []
}

export const HomeReducer = (state= initialState, action: any) : any => {
   
    switch(action.type){
        case CONTACTDATA_SUCCESS:
            return {
                ...state,
                contact: action.payload.data
            }
        case CONTACTDATA_FAILURE:
            return {
                ...state,
                contact: []
            } 
        case HOME_SUCCESS:
            return {
                ...state,
                data: action.payload.data
            }
        case HOME_FAILURE:
            return {
                ...state,
                data: []
            }
        default:
           return state;    
    }
}