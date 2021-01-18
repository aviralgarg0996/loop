import { BaseResponse } from '../response.model';
import { UserDetail } from './request.model';

export interface UserResponse extends BaseResponse{
    user_data: UserDetail
}


export interface TrackResponse extends BaseResponse{
    message: Track[]
}

export interface Track {
    track_id: string,
    name: string,
    primary: string | null,
    fileName: string,
    cover_image: string,
    users_id: string
}

