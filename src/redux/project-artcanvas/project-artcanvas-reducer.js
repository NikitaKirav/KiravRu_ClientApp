import { projectArtCanvasAPI } from "../../api/kirav-api.js";
import {checkLifetimeToken} from '../auth-main-reducer.js';

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
    checkLifetimeToken()(dispatch);
    projectArtCanvasAPI.uploadImage(data).then(data => {
        if(data.result) {
            dispatch(setResult(data.result));
            let time = data.result != '0' ? data.result : '1';
            alert('The time from last changes isn\'t up. Try again in ' + time + ' minute(s)');
        } else {
            dispatch(setImages(data));
        }       
        
    });
}

export const loadImages = () => (dispatch) => {
    checkLifetimeToken()(dispatch);
    projectArtCanvasAPI.loadImages().then(data => {
        dispatch(setImages(data));
    });
}

export default projectArtCanvasReducer;