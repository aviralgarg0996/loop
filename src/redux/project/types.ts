import { IExpertise, IGenre, IExpertiseItem, IGenreItem } from '../../utils/models/master-data/response.model';
export const PROJECT_CREATE_SUCCESS = 'PROJECT_CREATE_SUCCESS';
export const PROJECT_CREATE_FAILURE = 'PROJECT_CREATE_FAILURE';
  
export const PROJECT_LIST_SUCCESS = 'PROJECT_LIST_SUCCESS';
export const PROJECT_LIST_FAILURE = 'PROJECT_LIST_FAILURE';
export const PROJECT_BY_ID_SUCCESS = 'PROJECT_BY_ID_SUCCESS';
export const PROJECT_BY_ID_FAILURE = 'PROJECT_BY_ID_FAILURE';
   
    
interface ProjectCreateSuccessAction {
  type: typeof PROJECT_CREATE_SUCCESS,
  payload: any
}

interface ProjectCreateFailureAction {
    type: typeof PROJECT_CREATE_FAILURE
}    
interface ProjectListSuccessAction {
  type: typeof PROJECT_LIST_SUCCESS,
  payload: any
}

interface ProjectListFailureAction {
    type: typeof PROJECT_LIST_FAILURE
}
interface ProjectByIdSuccessAction {
  type: typeof PROJECT_BY_ID_SUCCESS,
  payload: any
}

interface ProjectByIdFailureAction {
    type: typeof PROJECT_BY_ID_FAILURE
}
 

export type ProjectActionType = ProjectByIdSuccessAction | ProjectByIdFailureAction | ProjectCreateSuccessAction | ProjectCreateFailureAction | ProjectListSuccessAction | ProjectListFailureAction;