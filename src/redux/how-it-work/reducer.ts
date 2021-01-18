 import { IMasterDataAuth } from '../master-data/types';
import {    HOWITWORK_SUCCESS, HOWITWORK_FAILURE } from './types';

const initialState  = {
    data: []
}

export const HowItWorkReducer = (state= initialState, action: any) : any => {
   
    switch(action.type){
        case HOWITWORK_SUCCESS:
            return {
                ...state,
                data: action.payload.data
            }
        case HOWITWORK_FAILURE:
            return {
                ...state,
                data: []
            }
        default:
           return state;    
    }

}