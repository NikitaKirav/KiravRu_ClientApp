import { adminAPI } from "../api/admin-api";
import { RoleType } from "../types/types";
import {checkLifetimeToken} from './auth-main-reducer';
import { BaseThunkType, InferActionsTypes } from "./redux-store";

const initialState = {
    role: null as RoleType | null,
    errors: null as string | null,
}

type InitialStateType = typeof initialState;

const roleAdmReducer = (state=initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'role-adm/SET_ROLE': {
            return {
                ...state,
                role: action.role,
                errors: null
            }
        }
        case 'role-adm/REMOVE_ROLE': {
            return {
                ...state,
                role: null,
                errors: null
            };
        }
        case 'role-adm/SET_ERRORS': {
            return {
                ...state,
                errors: action.errors
            };
        }
        default:
            return state;
        
    }
}

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    setRole: (role: RoleType) => {
        return { type: 'role-adm/SET_ROLE', role } as const;
    },
    setErrors: (errors: string) => {
        return { type: 'role-adm/SET_ERRORS', errors } as const;
    },
    removeRole: () => {
        return { type: 'role-adm/REMOVE_ROLE' } as const;
    }
}

type ThunkType = BaseThunkType<ActionsType>;

export const postCreateRole = (role: RoleType): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        let data = await adminAPI.postCreateRole(role);
        if(data.errors) {
            dispatch(actions.setErrors(data.errors));
        }  else {
            dispatch(actions.setRole(data.role));
        }
    }
}

export default roleAdmReducer;