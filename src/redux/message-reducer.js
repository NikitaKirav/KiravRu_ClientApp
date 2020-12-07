import { messageAPI } from "../api/kirav-api.js";

const SET_SENTMESSAGE = 'SET_SENTMESSAGE';
const SET_ERROR = 'SET_ERROR';

let initialState = {
    sentMessage: false,
    error: null
};

const messageReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SENTMESSAGE: {
            return {
                ...state,
                sentMessage: !state.sentMessage         
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.error,
            }
        }
        default: 
            return state;
    }
}

export const sendMessage = () => {
    return { type: SET_SENTMESSAGE };
}

export const getError = (error) => {
    return { type: SET_ERROR, error: error };
}

export const sendMessageToServer = (email, message) => (dispatch) => {
    messageAPI.send(email, message).then((data) => {
        console.log(data);
        if(data.error) {
            dispatch(getError(data.error));
        } else {
            dispatch(getError(null));
        }
        dispatch(sendMessage());  
    
    });
}



export default messageReducer;