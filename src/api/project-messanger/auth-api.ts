import { instance, APIResponseType } from './api';

type MeResponseDataType = {
    id: number, 
    email: string, 
    login: string
}
type LoginResponseDataType = {
    token: string
    userId: string
    userName: string
}

export const authAPI = {
    me() {
        //return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(response => response.data);
        return { resultCode: 0, data: { id: 0, email: '', login: '' } };
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType>>(`auth/login`, {email, password, rememberMe, captcha}).then(response => {
            instance.defaults.headers['Authorization'] = `Bearer ${response.data.data.token}`;
            return response.data;
        });
    },
    logout() {
        instance.defaults.headers['Authorization'] = `Bearer`;
    },
    register(email: string, password: string, userName: string) {
        return instance.post(`auth/register`, {email, password, userName}).then(response => response.data);
    }
}