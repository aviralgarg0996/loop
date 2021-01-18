import { IGenre } from './../../utils/models/master-data/response.model';
import { EXPERTISE_SUCCESS, EXPERTISE_FAILURE, GENRE_SUCCESS, MasterDataActionType } from './types';
import { Dispatch } from 'redux';
import API_PATH from '../../services/api-service/api-path';
import API from '../../services/api-service/api';
import { IExpertise } from '../../utils/models/master-data/response.model';

export function expertiseSuccess(data: IExpertise ): MasterDataActionType  {
  return {
    type: EXPERTISE_SUCCESS,
    payload:  data
  }
}

export function expertiseFailure(): MasterDataActionType {
  return {
    type: EXPERTISE_FAILURE,
  }
}

export function genreSuccess(data: IGenre ): MasterDataActionType  {
  return {
    type: GENRE_SUCCESS,
    payload:  data
  }
}

export function genreFailure(): MasterDataActionType {
  return {
    type: EXPERTISE_FAILURE,
  }
}

export const expertiseList = () =>  (dispatch: Dispatch) => {
    return new Promise(async(resolve, reject) => {
      try {
        let data = await API().get<IExpertise>(API_PATH.AREA_OF_EXPERTISE_LIST );
        dispatch(expertiseSuccess(data.data));
      } catch (error) {
        dispatch(expertiseFailure());
      }
    });
}

export const genreList = () =>  (dispatch: Dispatch) => {
    return new Promise(async(resolve, reject) => {
      try {
        let data = await API().get<IGenre>(API_PATH.GENRE_LIST );
        dispatch(genreSuccess(data.data));
      } catch (error) {
        dispatch(genreFailure());
      }
    });
}