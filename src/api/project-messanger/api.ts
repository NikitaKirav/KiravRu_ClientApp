import axios from 'axios';
import { UserType } from '../../redux/project-messenger/types/types';

export const instance = axios.create({
//    withCredentials: true,
//    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
//    headers:  {
//        "API-KEY": "64b4933c-d320-4708-ad57-93664b1c2552"
//    }
    baseURL: 'https://kirav.ru:4040/api/',
 //   baseURL: 'http://localhost:4000/api/',
    headers:  {
        'Authorization': `Bearer ${localStorage.getItem('userData_Messanger') ? JSON.parse(localStorage.getItem('userData_Messanger')).token : ''}`
    }
});

export enum ResultCode {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    data: {    
        items: Array<UserType>
        totalCount: number
        error: string | null
    }
}

export type ErrorsType = {
    value: string
    msg: string
    param: string
    location: string
}

export type APIResponseType<D = {}, RC = ResultCode> = {
    data: D
    message: string
    errors: Array<ErrorsType>
    resultCode: RC
}




