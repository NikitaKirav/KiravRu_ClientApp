import { authAPI } from '../api/auth-api';
import { FormAction, stopSubmit } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
    userName: null as string | null,
    isAuth: false,
    isFetching: false,
}

type InitialStateType = typeof initialState;

const authMainReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'auth/SET_USER_DATA': {
            return { 
                ...state, 
                ...action.data
            }
        }
        case 'auth/SET_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
    
}

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    setAuthUserData: (userName: string, isAuth: boolean) => {
        return { type: 'auth/SET_USER_DATA', data: { userName, isAuth } } as const;
    },
    setFetching: (isFetching: boolean) => {
        return { type: 'auth/SET_FETCHING', isFetching } as const;
    }
}

type ThunkType = BaseThunkType<ActionsType | FormAction>;

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me();
    if(response.data.resultCode === 0) {
        let userName = response.data.userName;
        dispatch(actions.setAuthUserData(userName, true));
    }
}

export const login = (userName: string, password: string, rememberMe: boolean, returnUrl = ''): ThunkType => async (dispatch) => {
    let response = await authAPI.login(userName, password, rememberMe, returnUrl);
    if(response.status !== 200) {
        let message = response.data.errorMessage;
        dispatch(stopSubmit("LoginForm", {_error: message}));        
    } else {
        dispatch(actions.setAuthUserData(userName, true));    
    }
}

export const register = (email: string, userName: string, password: string, passwordConfirm: string): ThunkType => async (dispatch) => {
    let response = await authAPI.register(email, userName, password, passwordConfirm);
    if(response.status !== 200) {
        let message = response.data.errorMessage;
        if(response.status === 400) {
            message = response.data.errors.PasswordConfirm;
        }
        dispatch(stopSubmit("RegisterForm", {_error: message}));        
    } else {
        dispatch(actions.setFetching(true));
    }
}

export const logout = (): BaseThunkType<ActionsType, void> => (dispatch) => {
    dispatch(actions.setAuthUserData(null, false));
    authAPI.logout();
}

export const checkLifetimeToken = (): BaseThunkType<ActionsType, boolean> => (dispatch) => {
    if (localStorage.getItem('expires_token') !== null) {
        var currentTime = new Date();
        var expiresToken = new Date(localStorage.getItem('expires_token'));
        if (expiresToken < currentTime) {
            dispatch(actions.setAuthUserData(null, false));
            authAPI.logout();
            return false;
        }
        return true;
    }
    return false;
}


export default authMainReducer;