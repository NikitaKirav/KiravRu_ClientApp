import { projectArtCanvasAPI } from "../../api/kirav-api.js";

const SET_RESULT = 'SET_RESULT';
const SET_IMAGES = 'SET_IMAGES';

let initialState = {
    result: null,
    images: null
}

const projectArtCanvasReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_IMAGES:{
            return {
                ...state,
                images: action.images
            }
        }
        case SET_RESULT:{
            return {
                ...state,
                result: action.result
            }
        }
        default:
            return state;
    }
}

export const setResult = (result) => {
    return {
        type: SET_RESULT,
        result
    }
}

export const setImages = (images) => {
    return {
        type: SET_IMAGES,
        images
    }
}

export const uploadImage = (data) => (dispatch) => {
    projectArtCanvasAPI.uploadImage(data).then(data => {
        if(data.result) {
            dispatch(setResult(data.result));
        } else {
            dispatch(setImages(data));
        }       
        
    });
}

export const loadImages = () => (dispatch) => {
    projectArtCanvasAPI.loadImages().then(data => {
        dispatch(setImages(data));
    });
}

export default projectArtCanvasReducer;