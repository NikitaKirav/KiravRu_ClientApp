import { adminAPI } from "../api/kirav-api.js";
import {checkLifetimeToken} from './auth-main-reducer.js';

const SET_ROLE = 'SET_ROLE';
const SET_ERRORS = 'SET_ERRORS';
const REMOVE_ROLE = 'REMOVE_ROLE';

const initialState = {
    role: null,
    errors: null,
}

const roleAdmReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_ROLE: {
            return {
                ...state,
                role: action.role,
                errors: null
            }
        }
        case REMOVE_ROLE: {
            return {
                ...state,
                role: null,
                errors: null
            };
        }
        case SET_ERRORS: {
            return {
                ...state,
                errors: action.errors
            };
        }
        default:
            return state;
        
    }
}

export const setRole = (role) => {
    return { type: SET_ROLE, role };
}

export const setErrors = (errors) => {
    return { type: SET_ERRORS, errors }
}

export const removeRole = () => {
    return { type: REMOVE_ROLE }
}

export const postCreateRole = (role) => (dispatch) => {
    let isToken = checkLifetimeToken()(dispatch);
    if (isToken) {
        adminAPI.postCreateRole(role).then(data => {
            if(data.errors) {
                dispatch(setErrors(data.errors));
            }  else {
                dispatch(setRole(data.role));
            }
        });
    }
}

export default roleAdmReducer;