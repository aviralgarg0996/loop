 import { IExpertise, IGenre, IExpertiseItem, IGenreItem } from './../../utils/models/master-data/response.model';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILURE = 'EDIT_PROFILE_FAILURE';

export const EXPERTISE_SUCCESS = 'EXPERTISE_SUCCESS';
export const EXPERTISE_FAILURE = 'EXPERTISE_FAILURE';

export const GENRE_SUCCESS = 'GENRE_SUCCESS';
export const GENRE_FAILURE = 'GENRE_FAILURE';

export interface IMasterDataAuth {
  expertiseList?: IExpertiseItem[],
  genreList?: IGenreItem[]
}

interface ExpertiseSuccessAction {
  type: typeof EXPERTISE_SUCCESS,
  payload: IExpertise
}

interface ExpertiseFailureAction {
    type: typeof EXPERTISE_FAILURE
}

interface GenreSuccessAction {
  type: typeof GENRE_SUCCESS,
  payload: IGenre
}

interface GenreFailureAction {
    type: typeof GENRE_FAILURE
}

export type MasterDataActionType = ExpertiseSuccessAction | ExpertiseFailureAction | GenreSuccessAction | GenreFailureAction ;