import { ProjectActionType, PROJECT_CREATE_SUCCESS, PROJECT_CREATE_FAILURE, PROJECT_LIST_SUCCESS, PROJECT_LIST_FAILURE, PROJECT_BY_ID_SUCCESS, PROJECT_BY_ID_FAILURE } from './types';

const initialState : any = {
    createProject: {},
    projectList: [],
}

export const ProjectReducer = (state= initialState, action: ProjectActionType) : any => {
   
    switch(action.type){
        case PROJECT_CREATE_SUCCESS:
            return {
                ...state,
                createProject: action.payload
            }
        case PROJECT_CREATE_FAILURE:
            return {
                ...state,
                createProject: {}
            }
        case PROJECT_LIST_SUCCESS:
            return {
                ...state,
                projectList: action.payload
            }
        case PROJECT_LIST_FAILURE:
            return {
                ...state,
                projectList: []
            }
        case PROJECT_BY_ID_SUCCESS:
            return {
                ...state,
                project: action.payload
            }
        case PROJECT_BY_ID_FAILURE:
            return {
                ...state,
                project: {}
            }
        default:
           return state;    
    }
}