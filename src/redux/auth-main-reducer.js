import { authAPI } from '../api/kirav-api.js';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_FETCHING = 'SET_FETCHING';


let initialState = {
    userName: null,
    isAuth: false,
    isFetching: false,
}

const authMainReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA: {
            return { 
                ...state, 
                ...action.data
            }
        }
        case SET_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
    
}

export const setAuthUserData = (userName, isAuth) => {
    return { type: SET_USER_DATA, data: { userName, isAuth } };
}

export const setFetching = (isFetching) => {
    return { type: SET_FETCHING, isFetching };
}

export const getAuthUserData = () => (dispatch) => {
    return authAPI.me().then(response => {
        if(response.data.resultCode === 0) {
            let userName = response.data.userName;
            dispatch(setAuthUserData(userName, true));
        }
     });
}

export const login = (userName, password, rememberMe, returnUrl = '') => (dispatch) => {
    authAPI.login(userName, password, rememberMe, returnUrl).then(response => {
        if(response.status !== 200) {
            let message = response.data.errorMessage;
            dispatch(stopSubmit("LoginForm", {_error: message}));        
        } else {
            dispatch(setAuthUserData(userName, true));    
        }
     });
}

export const register = (email, userName, password, passwordConfirm) => (dispatch) => {
    authAPI.register(email, userName, password, passwordConfirm).then(response => {
        if(response.status !== 200) {
            let message = response.data.errorMessage;
            if(response.status === 400) {
                message = response.data.errors.PasswordConfirm;
            }
            dispatch(stopSubmit("RegisterForm", {_error: message}));        
        } else {
            dispatch(setFetching(true));
        }
    });
}

export const logout = () => (dispatch) => {
    dispatch(setAuthUserData(null, false));
    authAPI.logout();
}

export const checkLifetimeToken = () => (dispatch) => {
    if (localStorage.getItem('expires_token') !== null) {
        var currentTime = new Date();
        var expiresToken = new Date(localStorage.getItem('expires_token'));
        if (expiresToken < currentTime) {
            dispatch(setAuthUserData(null, false));
            authAPI.logout();
            return false;
        }
        return true;
    }
    return false;
}


export default authMainReducer;