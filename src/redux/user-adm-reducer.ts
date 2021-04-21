import { adminAPI } from "../api/admin-api";
import { RoleType, UserType } from "../types/types";
import {checkLifetimeToken} from './auth-main-reducer';
import { BaseThunkType, InferActionsTypes } from "./redux-store";


const initialState = {
    user: null as UserType | null,
    errors: null as string | null,
    listRoles: null as Array<RoleType> | any
}

type InitialStateType = typeof initialState;

const userAdmReducer = (state=initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'user-adm/SET_USER': {
            return {
                ...state,
                user: action.user,
                errors: null
            }
        }
        case 'user-adm/REMOVE_USER': {
            return {
                ...state,
                user: null,
            };
        }
        case 'user-adm/SET_ERRORS': {
            return {
                ...state,
                errors: action.errors
            };
        }
        case 'user-adm/SET_USER_ACCESS_EDIT': {
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

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    setUser: (user: UserType) => {
        return { type: 'user-adm/SET_USER', user } as const;
    },
    setUserAccessEdit: (user: UserType, listRoles: Array<RoleType>) => {
        return { type: 'user-adm/SET_USER_ACCESS_EDIT', user, listRoles } as const;
    },
    setErrors: (errors: string) => {
        return { type: 'user-adm/SET_ERRORS', errors } as const;
    },
    removeUser: () => {
        return { type: 'user-adm/REMOVE_USER' } as const;
    }
}

type ThunkType = BaseThunkType<ActionsType>;

export const getUserEdit = (userId: number): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        let data = await adminAPI.getUser(userId);
        dispatch(actions.setUser(data.user));
    }
}

export const getUserForChangePassword = (userId: number): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        let data = await adminAPI.getChangePassword(userId);
        dispatch(actions.setUser(data.user));
    }
}

export const postUserChangePassword = (user: UserType): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        let data = await adminAPI.postChangePassword(user);
        if(data.errors) {
            dispatch(actions.setErrors(data.errors));
        }  else {
            dispatch(actions.setUser(data.user));
        }
    }
}

export const postUserEdit = (user: UserType): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        let data = await adminAPI.postUser(user);  
        if(data.errors) {
            dispatch(actions.setErrors(data.errors));
        }  else {
            dispatch(actions.setUser(data.user));
        }
    }
}

export const getUserAccess = (userId: number): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        let data = await adminAPI.getUserAccess(userId);
        dispatch(actions.setUserAccessEdit(data.userAccess.user, data.userAccess.roles));
    }
}

export const putUpdateAccess = (access: any): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        let data = await adminAPI.putUpdateAccess(access);
        if(data.errors) {
            dispatch(actions.setErrors(data.errors));
        }
    }
}

export default userAdmReducer;
