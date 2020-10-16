import { adminAPI } from "../api/kirav-api.js";
import {checkLifetimeToken} from './auth-main-reducer.js';

const SET_USERS = 'SET_USERS';
const SET_ROLES = 'SET_ROLES';
const CHANGE_USERS = 'CHANGE_USERS';
const CHANGE_ROLES = 'CHANGE_ROLES';


const initialState = {
    users: null,
    roles: null,
    changeUsers: false,
    changeRoles: false
};

const usersAdmReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_ROLES: {
            return {
                ...state,
                roles: action.roles
            }
        }
        case CHANGE_USERS: {
            return {
                ...state,
                changeUsers: !state.changeUsers
            }
        }
        case CHANGE_ROLES: {
            return {
                ...state,
                changeRoles: !state.changeRoles
            }
        }
        default:
            return state;
        
    }
}

export const setUsers = (users) => {
    return { type: SET_USERS, users };
}

export const changeUsers = () => {
    return {
        type: CHANGE_USERS
    }
}

export const changeRoles = () => {
    return {
        type: CHANGE_ROLES
    }
}

export const setRoles = (roles) => {
    return { type: SET_ROLES, roles };
}

export const getUsers = (search = '') => (dispatch) => {
    let isToken = checkLifetimeToken()(dispatch);
    if (isToken) {
        adminAPI.getUsers(search).then(response => {
            dispatch(setUsers(response.data.users));
        });
    }
}

export const getRoles = (search = '') => (dispatch) => {
    let isToken = checkLifetimeToken()(dispatch);
    if (isToken) {
        adminAPI.getRoles(search).then(response => {
            dispatch(setRoles(response.data.roles));
        });
    }
}

export const deleteUser = (userId) => (dispatch) => {
    let isToken = checkLifetimeToken()(dispatch);
    if (isToken) {
        adminAPI.getUserDelete(userId).then(() => {
            dispatch(changeUsers());
        });
    }
} 

export const deleteRole = (roleId) => (dispatch) => {
    let isToken = checkLifetimeToken()(dispatch);
    if (isToken) {
        adminAPI.getRoleDelete(roleId).then(() => {
            dispatch(changeRoles());
        });
    }
}

export default usersAdmReducer;