import { messageAPI } from "../api/message-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    isLoading: false,
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
        case 'message/SET_ISLOADING': {
            return {
                ...state,
                isLoading: action.isLoading
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
    },
    setIsLoading: (isLoading: boolean) => {
        return { type: 'message/SET_ISLOADING', isLoading } as const;
    }
}

type ThunkType = BaseThunkType<ActionsType>;

export const sendMessageToServer = (name: string, email: string, message: string): ThunkType => async (dispatch) => {
    dispatch(actions.setIsLoading(true)); 
    let data = await messageAPI.send(name, email, message);
    if(data.error) {
        dispatch(actions.getError(data.error));
    } else {
        dispatch(actions.getError(null));
    }
    dispatch(actions.sendMessage());  
    dispatch(actions.setIsLoading(false)); 
}



export default messageReducer;