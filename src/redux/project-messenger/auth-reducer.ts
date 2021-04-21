import { authAPI } from '../../api/project-messanger/auth-api';
import { ResultCode } from '../../api/project-messanger/api';
import { FormAction, stopSubmit } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from '../redux-store';
import { securityAPI } from '../../api/project-messanger/security-api';
import {actions as actionsChat} from './chat-reducer';
import {actions as actionsUser} from './users-reducer';


const storageName = 'userData_Messanger';

let initialState = {
    userId: null as string | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null as string | null,  // if null then captcha is not required
    token: null,
    error: null as string | null,
    registerSuccess: false
}

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'project-messenger/auth/SET_USER_DATA': {
            return {
                ...state,
                ...action.data
            }
        }
        case 'project-messenger/auth/GET_CAPTCHA_URL_SUCCESS': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'project-messenger/auth/SET_ERROR': {
            return {
                ...state,
                error: action.payload.error
            }
        }
        case 'project-messenger/auth/SET_REGISTER_SUCCESS': {
            return {
                ...state,
                registerSuccess: action.payload.registerSuccess
            }
        }
        default:
            return state;
    }
    
}

export type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    setAuthUserData: (userId: string | null, token: string | null) => {
        return { type: 'project-messenger/auth/SET_USER_DATA', data: { userId, token, isAuth: !!token } } as const;
    },
    getCaptchaUrlSuccess: (captchaUrl: string) => {
        return {type: 'project-messenger/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl} }as const;
    },
    setError: (error: string | null) => {
        return {type: 'project-messenger/auth/SET_ERROR', payload: {error}} as const;
    },
    setRegisterSuccess: (registerSuccess: boolean) => {
        return {type: 'project-messenger/auth/SET_REGISTER_SUCCESS', payload: {registerSuccess}} as const;
    }  
}

type ThunkType = BaseThunkType<ActionsType | FormAction>;

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const data = JSON.parse(localStorage.getItem(storageName)); 
    if(data && data.token) {
        dispatch(actions.setAuthUserData(data.userId, data.token));
    }
}

export const login = (email: string, password: string): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setError(null));
        const response = await authAPI.login(email, password);
        if(response.resultCode === ResultCode.Success) {
            localStorage.setItem(storageName, JSON.stringify({ userId: response.data.userId, userName: response.data.userName, token: response.data.token }));
            dispatch(actions.setAuthUserData(response.data.userId, response.data.token));
        } else {
            let message = response.message ? response.message : "Some error";
            dispatch(actions.setError(message));
            //dispatch(stopSubmit("login", {_error: message}));
        }
    } catch(error) {
        dispatch(actions.setError("Some error"));
        //dispatch(stopSubmit("login", {_error: "Some error"}));
    }
}

export const register = (email: string, password: string, userName: string): ThunkType => async (dispatch) => {
    try {
        dispatch(actions.setError(null));
        dispatch(actions.setRegisterSuccess(false));
        let response = await authAPI.register(email, password, userName);
        if(response.resultCode === ResultCode.Success) {
            //alert(response.message);
            dispatch(actions.setRegisterSuccess(true));
        }
        if(response.resultCode === ResultCode.Error) {
            let message = response.errors.length > 0 ? response.errors[0].msg : "Some error";
            dispatch(actions.setError(message));
            //dispatch(stopSubmit("registerMessanger", {_error: message}));
        }
    } catch(error) {
        dispatch(actions.setError("Some error"));
        //dispatch(stopSubmit("registerMessanger", {_error: "Some error"}));
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const logout = (): ThunkType => async (dispatch) => {
    dispatch(actions.setAuthUserData(null, null));
    localStorage.removeItem(storageName);  
    await authAPI.logout();
    dispatch(actionsChat.resetChatList());
    dispatch(actionsUser.setUsers([]));
}

export default authReducer;