import { User } from '../../redux/auth/types';

export interface BaseResponse{
    success: boolean,
 }

 export interface Auth extends BaseResponse {
    data: User,
    token: string
} 

export interface ContactUs extends BaseResponse {
    message: string,
} 