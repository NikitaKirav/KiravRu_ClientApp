import { projectArtCanvasAPI } from "../../api/projectArtCanvas-api";
import { checkLifetimeToken } from '../auth-main-reducer';
import { BaseThunkType, InferActionsTypes } from "../redux-store";

let initialState = {
    result: null as string,
    images: null as Array<string>
}

type InitialStateType = typeof initialState;

const projectArtCanvasReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'project-artcanvas/SET_IMAGES':{
            return {
                ...state,
                images: action.images
            }
        }
        case 'project-artcanvas/SET_RESULT':{
            return {
                ...state,
                result: action.result
            }
        }
        default:
            return state;
    }
}

export type ActionsType = InferActionsTypes<typeof actions>;

const actions = {
    setResult: (result: any) => {
        return { type: 'project-artcanvas/SET_RESULT', result } as const;
    },
    setImages: (images: any) => {
        return { type: 'project-artcanvas/SET_IMAGES', images } as const;
    }
}

type ThunkType = BaseThunkType<ActionsType>;

export const uploadImage = (data: any): ThunkType => async (dispatch) => {
    try {
        checkLifetimeToken();
        const response = await projectArtCanvasAPI.uploadImage(data);
        if(response.result) {
            dispatch(actions.setResult(response.result));
            let time = response.result != '0' ? response.result : '1';
            alert('The time from last changes isn\'t up. Try again in ' + time + ' minute(s)');
        } else {
            dispatch(actions.setImages(response));
        }    
    } catch(err) { console.error(err); }    
}

export const loadImages = (): ThunkType => async (dispatch) => {
    try {
        checkLifetimeToken();
        const data = await projectArtCanvasAPI.loadImages();
        dispatch(actions.setImages(data));
    } catch(err) { console.error(err); }     
}

export default projectArtCanvasReducer;