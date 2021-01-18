import { IGenre } from '../../utils/models/master-data/response.model';
import {  ProjectActionType, PROJECT_BY_ID_SUCCESS, PROJECT_BY_ID_FAILURE, PROJECT_CREATE_SUCCESS, PROJECT_CREATE_FAILURE, PROJECT_LIST_SUCCESS, PROJECT_LIST_FAILURE } from './types';
import { Dispatch } from 'redux';
import API_PATH from '../../services/api-service/api-path';
import API from '../../services/api-service/api';
import { loadingAction } from '../auth/action';

export function createProjectSuccess(data: any[] ): ProjectActionType  {
  return {
    type: PROJECT_CREATE_SUCCESS,
    payload:  data
  }
}

export function createProjectFailure(): ProjectActionType {
  return {
    type: PROJECT_CREATE_FAILURE,
  }
} 

export function listProjectSuccess(data: any[] ): ProjectActionType  {
  return {
    type: PROJECT_LIST_SUCCESS,
    payload:  data
  }
}

export function listProjectFailure(): ProjectActionType {
  return {
    type: PROJECT_LIST_FAILURE,
  }
} 

export function projectByIdSuccess(data: any ): ProjectActionType  {
  console.log("##data", data);
  
  return {
    type: PROJECT_BY_ID_SUCCESS,
    payload:  data
  }
}

export function projectByIdFailure(): ProjectActionType {
  return {
    type: PROJECT_BY_ID_FAILURE,
  }
} 
 
export const createProject = (data: any) =>  (dispatch: Dispatch) => {
   
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("cover_image", data.coverFile);
  data.tracksImageFile && data.tracksImageFile.forEach((element : any, index: number) => {
     formData.append(`tracks[${index}][tracks_image]`, element);
  });

  data.tracksFile && data.tracksFile.forEach((element : any, index: number) => { 
    formData.append(`tracks[${index}][tracks_file]`, element);
  });

  data.tracks_title && data.tracks_title.forEach((element : any, index: number) => {
    formData.append(`tracks[${index}][tracks_title]`, element);
  });
 
  // data.voiceFiles && data.voiceFiles.forEach((element : any, index: number) => {
  //   formData.append(`tracks[${index}][tracks_title]`, element);
  // });

  data.voiceFiles && data.voiceFiles.forEach((element : any, index: number) => {
     formData.append(`files[${index}][file]`, element);
  });
  // formData.append("voice_memos_files[]", data.voiceFiles);
  data.voice_memos_title && data.voice_memos_title.forEach((element : any, index: number) => {
    formData.append(`files[${index}][title]`, element);
  });

  data.collaborator_id && (data.collaborator_id || []).forEach((element : any, index: number) => {
    formData.append(`collaborator_id[${index}]`, element);
  });
 
  // formData.append("collaborator_id[]", data.collaborator_id || [] );

  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().post(API_PATH.CREATE_PROJECT, formData );
      dispatch(createProjectSuccess(data.data));
      dispatch(loadingAction(false));
      resolve({data: data.data.message});
    } catch (error) {
      dispatch(createProjectFailure());
      dispatch(loadingAction(false));
      reject({error: error});
    }
  });

} 
export const updatePoject =  (dataForm: any) =>  (dispatch: Dispatch)  => {
  console.log();
  const formData = new FormData();
  formData.append("project_id", dataForm.project_id);
  formData.append("name", dataForm.name);
  formData.append("description", dataForm.description);
  if(dataForm.coverFile){
  formData.append("cover_image", dataForm.coverFile);
  }
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().post(API_PATH.UPDATDE_PROJECT, formData);
      dispatch(loadingAction(false));
      resolve({ data: data.data.message });
    } catch (error) {
      dispatch(loadingAction(false));
      reject({ error: error });
    }
  });
};
 
export const getProjects = () =>  (dispatch: Dispatch) => {
  
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().get(API_PATH.LIST_PROJECT );
      dispatch(listProjectSuccess(data.data && data.data.data || []));
      dispatch(loadingAction(false));
      resolve({data: data.data.message});
    } catch (error) {
      dispatch(listProjectFailure());
      dispatch(loadingAction(false));
      reject({error: error});
    }
  });

} 

export const projectById = (id: string) =>  (dispatch: Dispatch) => {
  
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().get(API_PATH.PROJECT_DETAILS + '/'+ id );
      dispatch(projectByIdSuccess(data.data && data.data.message || {}));
      dispatch(loadingAction(false));
      resolve({data: data.data.message});
    } catch (error) {
      dispatch(projectByIdFailure());
      dispatch(loadingAction(false));
      reject({error: error});
    }
  });

} 

export const createProjectInit = (id: string) =>  (dispatch: Dispatch) => {
  dispatch(projectByIdFailure());
} 

export const projectAddCollaborator = (payload: any) =>  (dispatch: Dispatch) => {
  
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().post(API_PATH.PROJECT_ADD_COLLABORATOR, payload);
      dispatch(loadingAction(false));
      resolve({data: data.data.message});
    } catch (error) {
      dispatch(loadingAction(false));
      reject({error: error});
    }
  });

} 

export const projectAddTrack = (payload: any) =>  (dispatch: Dispatch) => {
  
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().post(API_PATH.PROJECT_ADD_TRACK, payload);
      dispatch(loadingAction(false));
      resolve({data: data.data.message});
    } catch (error) {
      dispatch(loadingAction(false));
      reject({error: error});
    }
  });
} 

export const projectAddFile = (payload: any) =>  (dispatch: Dispatch) => {
  
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().post(API_PATH.PROJECT_ADD_FILE, payload);
      dispatch(loadingAction(false));
      resolve({data: data.data.message});
    } catch (error) {
      dispatch(loadingAction(false));
      reject({error: error});
    }
  });
} 

export const projectRemoveTrack = (id: string) =>  (dispatch: Dispatch) => {
  
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().get(API_PATH.PROJECT_DELETE_TRACK + '/'+ id);
      dispatch(loadingAction(false));
      resolve({data: data.data.message});
    } catch (error) {
      dispatch(loadingAction(false));
      reject({error: error});
    }
  });


} 


export const projectAddVoice = (payload: any) =>  (dispatch: Dispatch) => {
  
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().post(API_PATH.PROJECT_ADD_VOICE, payload);
      dispatch(loadingAction(false));
      resolve({data: data.data.message});
    } catch (error) {
      dispatch(loadingAction(false));
      reject({error: error});
    }
  });


} 

export const projectRemoveVoice = (id: string) =>  (dispatch: Dispatch) => {
  
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().get(API_PATH.PROJECT_DELETE_VOICE + '/'+ id);
      dispatch(loadingAction(false));
      resolve({data: data.data.message});
    } catch (error) {
      dispatch(loadingAction(false));
      reject({error: error});
    }
  });
} 

export const projectDelete = (id: string) =>  (dispatch: Dispatch) => {
  
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().get(API_PATH.PROJECT_DELETE + '/'+ id);
      dispatch(loadingAction(false));
      resolve({data: data.data.message});
    } catch (error) {
      dispatch(loadingAction(false));
      reject({error: error});
    }
  });
} 


export const projectAddAsArchive = (id: string) =>  (dispatch: Dispatch) => {
  
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().get(API_PATH.PROJECT_ADD_ARCHIVE + '/'+ id);
      dispatch(loadingAction(false));
      resolve({data: data.data.message});
    } catch (error) {
      dispatch(loadingAction(false));
      reject({error: error});
    }
  });
} 

export const projectRemoveArchive = (id: string) =>  (dispatch: Dispatch) => {
  
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().get(API_PATH.PROJECT_REMOVE_ARCHIVE + '/'+ id);
      dispatch(loadingAction(false));
      resolve({data: data.data.message});
    } catch (error) {
      dispatch(loadingAction(false));
      reject({error: error});
    }
  });
} 


export const projectRemoveFile = (id: string) =>  (dispatch: Dispatch) => {
  
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().get(API_PATH.PROJECT_REMOVE_FILE + '/'+ id);
      dispatch(loadingAction(false));
      resolve({data: data.data.message});
    } catch (error) {
      dispatch(loadingAction(false));
      reject({error: error});
    }
  });
}

