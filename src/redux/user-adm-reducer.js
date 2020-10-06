import { adminAPI } from "../api/kirav-api.js";


const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';
const SET_ERRORS = 'SET_ERRORS';
const SET_USER_ACCESS_EDIT = 'SET_USER_ACCESS_EDIT';

const initialState = {
    user: null,
    errors: null,
    listRoles: null
}

const userAdmReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.user,
                errors: null
            }
        }
        case REMOVE_USER: {
            return {
                ...state,
                user: null,
            };
        }
        case SET_ERRORS: {
            return {
                ...state,
                errors: action.errors
            };
        }
        case SET_USER_ACCESS_EDIT: {
            return {
                ...state,
                user: action.user,
                listRoles: action.listRoles
            }
        }
        default:
            return state;
        
    }
}

export const setUser = (user) => {
    return { type: SET_USER, user };
}

//export const setUserAccess = (rolesActiv) => {
//    return { type: SET_ROLE, rolesActiv };
//}

export const setUserAccessEdit = (user, listRoles) => {
    return {
        type: SET_USER_ACCESS_EDIT,
        user, listRoles
    }
}

export const setErrors = (errors) => {
    return { type: SET_ERRORS, errors }
}

export const removeUser = () => {
    return { type: REMOVE_USER }
}

export const getUserEdit = (userId) => (dispatch) => {
    adminAPI.getUser(userId).then(data => {
        dispatch(setUser(data.user));
    });
}

export const getUserForChangePassword = (userId) => (dispatch) => {
    adminAPI.getChangePassword(userId).then(data => {
        dispatch(setUser(data.user));
    });
}

export const postUserChangePassword = (user) => (dispatch) => {
    adminAPI.postChangePassword(user).then(data => {
        if(data.errors) {
            dispatch(setErrors(data.errors));
        }  else {
            dispatch(setUser(data.user));
        }
    });
}

export const postUserEdit = (user) => (dispatch) => {
    adminAPI.postUser(user).then(data => {  
        if(data.errors) {
            dispatch(setErrors(data.errors));
        }  else {
            dispatch(setUser(data.user));
        }
        
    });
}

export const getUserAccess = (userId) => (dispatch) => {
    adminAPI.getUserAccess(userId).then(data => {
        dispatch(setUserAccessEdit(data.userAccess.user, data.userAccess.roles));
    });
}

export const putUpdateAccess = (access) => (dispatch) => {
    adminAPI.putUpdateAccess(access).then(data => {
        if(data.errors) {
            dispatch(setErrors(data.errors));
        }
    });
}

export default userAdmReducer;
