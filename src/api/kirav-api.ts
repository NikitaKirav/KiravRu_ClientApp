import axios from 'axios';
import {baseUrl} from "./base-url";

export const instance = axios.create({
    //withCredentials: true,
    baseURL: baseUrl()+'/api/',
    headers:  {
        'Authorization': `Bearer  ${localStorage.getItem('token')}`
    }
});

export enum ResultCode {
    Success = 0,
    Error = 100
}



