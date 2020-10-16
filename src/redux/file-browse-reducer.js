import { imageAPI } from "../api/kirav-api.js";
import {checkLifetimeToken} from './auth-main-reducer.js';

const SET_DIR_INFOS = 'SET_DIR_INFOS';

let initialState = {
    dirInfos: null
}

const fileBrowseReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_DIR_INFOS:  {
            return {
                dirInfos: action.dirInfos
            };
        }
        default:
            return state;
    }
}

export const setDirInfos = (dirInfos) => {
    return {
        type: SET_DIR_INFOS,
        dirInfos
    }
}

export const getDirInfos = () => (dispatch) => {
    let isToken = checkLifetimeToken()(dispatch);
    if (isToken) {
        imageAPI.getDirInfos().then(data => {        
            dispatch(setDirInfos(data.dirInfos));
        });
    }
}

export const getDirectory = (url) => (dispatch) => {
    let isToken = checkLifetimeToken()(dispatch);
    if (isToken) {
        imageAPI.getDirectory(url).then(data => {        
            dispatch(setDirInfos(data.dirInfos));
        });
    }
}

export default fileBrowseReducer;
