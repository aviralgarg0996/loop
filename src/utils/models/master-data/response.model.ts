import { BaseResponse } from '../response.model';
 
export interface IExpertise extends BaseResponse{
    data: IExpertiseItem[]
}

export interface IExpertiseItem {
    expertise_id: string,
    name: string
}

export interface IGenre extends BaseResponse{
    data: IGenreItem[]
}

export interface IGenreItem {
    genre_id: string,
    name: string
}

export interface IGenreItem {
    genre_id: string,
    name: string
}
