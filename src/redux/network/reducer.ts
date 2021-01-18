import { NetworkActionType, MY_NETWORK_SUCCESS, NETWORK_ADD_SUCCESS, MY_NETWORK_FAILURE, NETWORK_ADD_FAILURE, NETWORK_REMOVE_SUCCESS, NETWORK_REMOVE_FAILURE } from './types';

const initialState : any = {
    myNetwork: [],
    addNetwork: {},
    removeNetwork: {}
}

export const NetworkReducer = (state= initialState, action: NetworkActionType) : any => {
   
    switch(action.type){
        case MY_NETWORK_SUCCESS:
            return {
                ...state,
                 myNetwork: action.payload
            }
        case MY_NETWORK_FAILURE:
            return {
                ...state,
                myNetwork: []
            }
        case NETWORK_ADD_SUCCESS:
            return {
                ...state,
                addNetwork: action.payload
            }
        case NETWORK_ADD_FAILURE:
            return {
                ...state,
                addNetwork: {}
            }
        case NETWORK_REMOVE_SUCCESS:
            return {
                ...state,
                removeNetwork: action.payload.data
            }
        case NETWORK_REMOVE_FAILURE:
            return {
                ...state,
                removeNetwork: {}
            }
        default:
           return state;    
    }
}