import { adminAPI } from "../api/admin-api";
import { RoleType, UserType } from "../types/types";
import {checkLifetimeToken} from './auth-main-reducer';
import { BaseThunkType, InferActionsTypes } from "./redux-store";

const initialState = {
    users: null as Array<UserType> | null,
    roles: null as Array<RoleType> | null,
    changeUsers: false,
    changeRoles: false
};

type InitialStateType = typeof initialState;

const usersAdmReducer = (state=initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'users-adm/SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'users-adm/SET_ROLES': {
            return {
                ...state,
                roles: action.roles
            }
        }
        case 'users-adm/CHANGE_USERS': {
            return {
                ...state,
                changeUsers: !state.changeUsers
            }
        }
        case 'users-adm/CHANGE_ROLES': {
            return {
                ...state,
                changeRoles: !state.changeRoles
            }
        }
        default:
            return state;
        
    }
}

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    setUsers: (users: Array<UserType>) => {
        return { type: 'users-adm/SET_USERS', users } as const;
    },
    changeUsers: () => {
        return { type: 'users-adm/CHANGE_USERS' } as const;
    },
    changeRoles: () => {
        return { type: 'users-adm/CHANGE_ROLES' } as const;
    },
    setRoles: (roles: Array<RoleType>) => {
        return { type: 'users-adm/SET_ROLES', roles } as const;
    }
}

type ThunkType = BaseThunkType<ActionsType>;

export const getUsers = (search = ''): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        let response = await adminAPI.getUsers(search);
        dispatch(actions.setUsers(response.data.users));
    }
}

export const getRoles = (search = ''): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        let response = await adminAPI.getRoles(search);
        dispatch(actions.setRoles(response.data.roles));
    }
}

export const deleteUser = (userId: number): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        await adminAPI.userDelete(userId);
        dispatch(actions.changeUsers());
    }
} 

export const deleteRole = (roleId: number): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        await adminAPI.roleDelete(roleId);
        dispatch(actions.changeRoles());
    }
}

export default usersAdmReducer;