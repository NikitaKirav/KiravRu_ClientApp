import { messageAPI } from "../api/message-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    sentMessage: false,
    error: null as string | null
};

type InitialStateType = typeof initialState;

const messageReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'message/SET_SENTMESSAGE': {
            return {
                ...state,
                sentMessage: !state.sentMessage         
            }
        }
        case 'message/SET_ERROR': {
            return {
                ...state,
                error: action.error,
            }
        }
        default: 
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    sendMessage: () => {
        return { type: 'message/SET_SENTMESSAGE' } as const;
    },
    getError: (error: string) => {
        return { type: 'message/SET_ERROR', error: error } as const;
    }
}

type ThunkType = BaseThunkType<ActionsType>;

export const sendMessageToServer = (email: string, message: string): ThunkType => async (dispatch) => {
    let data = await messageAPI.send(email, message);
    if(data.error) {
        dispatch(actions.getError(data.error));
    } else {
        dispatch(actions.getError(null));
    }
    dispatch(actions.sendMessage());  
}



export default messageReducer;