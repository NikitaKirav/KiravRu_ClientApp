import { imageAPI } from "../api/image-api";
import { DirInfosType } from "../types/types";
import {checkLifetimeToken} from './auth-main-reducer';
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    dirInfos: null as DirInfosType | null
}

type InitialStateType = typeof initialState;

const fileBrowseReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'file-browse/SET_DIR_INFOS':  {
            return {
                dirInfos: action.dirInfos
            };
        }
        default:
            return state;
    }
}

type ActionsType =InferActionsTypes<typeof actions>;

export const actions = {
    setDirInfos: (dirInfos: DirInfosType) => {
        return { type: 'file-browse/SET_DIR_INFOS', dirInfos } as const;
    }
}

type ThunkType = BaseThunkType<ActionsType>;

export const getDirInfos = (): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        let data = await imageAPI.getDirInfos();        
        dispatch(actions.setDirInfos(data.dirInfos));
    }
}

export const getDirectory = (url: string): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        let data = await imageAPI.getDirectory(url);       
        dispatch(actions.setDirInfos(data.dirInfos));
    }
}

export default fileBrowseReducer;
