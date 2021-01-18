 import { EXPERTISE_FAILURE, EXPERTISE_SUCCESS, IMasterDataAuth, MasterDataActionType, GENRE_SUCCESS, GENRE_FAILURE } from './types';

const initialState : IMasterDataAuth = {
    expertiseList: [],
    genreList: []
}

export const MasterDataReducer = (state= initialState, action: MasterDataActionType) : IMasterDataAuth => {
   
    switch(action.type){
        case EXPERTISE_SUCCESS:
            let expertise = (action.payload.data || []).filter((item: any) => item != null)
            return {
                ...state,
                 expertiseList: expertise
            }
        case EXPERTISE_FAILURE:
            return {
                ...state,
                expertiseList: []
            }
        case GENRE_SUCCESS:
            return {
                ...state,
                genreList: action.payload.data
            }
        case GENRE_FAILURE:
            return {
                ...state,
                genreList: []
            }
        default:
           return state;    
    }
}