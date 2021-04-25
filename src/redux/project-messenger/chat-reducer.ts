import { chatAPI, ChatType, StatusType } from '../../api/project-messanger/chat-api';
import { ResultCode } from '../../api/project-messanger/api';
import { FormAction, stopSubmit } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from '../redux-store';
import { securityAPI } from '../../api/project-messanger/security-api';
import { Dispatch } from 'redux';
import messenger from '../../Projects/Messenger/messenger';


let initialState = {
    data: {    
        action: '',
        message: {},
        messages: [],
        onlineUsers: [],
        chatList: [],
        userAvatar: {},
        usersAvatarsFriends: []
    } as ChatType,
    status: 'pending' as StatusType,
}

export type InitialStateType = typeof initialState;

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'project-messenger/chat/MESSAGES_RECEIVED': {
            return {
                ...state,
                data: {...state.data, ...action.payload.messages}
            }
        }
        case 'project-messenger/chat/STATUS_CHANGED': {
            return {
                ...state,
                status: action.payload.status
            }
        }
        case 'project-messenger/chat/RESET_CHAT_LIST': {
            return {
                ...state,
                data: {
                    ...state.data,
                    chatList: []
                }
            }
        }
      /*  case 'project-messenger/chat/ADD_USER_ONLINE': {
            return {
                ...state,
                usersOnline: [...state.usersOnline, {
                    email: action.payload.email,
                    userName: action.payload.userName,
                    userPhoto: action.payload.userPhoto
                }]
            }
        }
        case 'project-messenger/chat/UPDATE_MESSAGE_COUNT': {
            const userOnline = state.usersOnline.find(user => user.email === action.payload.email);
            userOnline.newMessageCount = action.payload.newMessageCount; 
            return state;
        }*/
        default:
            return state;
    }
    
}

export type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    messagesReceived: (messages: ChatType[]) => {
        return { type: 'project-messenger/chat/MESSAGES_RECEIVED', payload: {messages} } as const;
    },
    statusChanged: (status: StatusType) => {
        return { type: 'project-messenger/chat/STATUS_CHANGED', payload: {status} } as const;
    },
    addUserOnline: (userName, userPhoto, email) => {
        return { type: 'project-messenger/chat/ADD_USER_ONLINE', payload: { userName, userPhoto, email }} as const;
    },
    updateMessageCount: (email, newMessageCount) => {
        return { type: 'project-messenger/chat/UPDATE_MESSAGE_COUNT', payload: { email, newMessageCount }} as const;
    },
    resetChatList: () => {
        return { type: 'project-messenger/chat/RESET_CHAT_LIST' } as const;
    }
}

type ThunkType = BaseThunkType<ActionsType | FormAction>;

let _newMessageHandler: ((messages: ChatType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        }
    }
    return _newMessageHandler;
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status));
        }
    }
    return _statusChangedHandler;
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
}

export const sendMessage = (email: string, text: string, addressee: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(email, text, addressee);
}

export const getChatList = (): ThunkType => async (dispatch) => {
    chatAPI.getChatList();
}

export const getMessagesFromUser = (userId: string): ThunkType => async (dispatch) => {
    chatAPI.getMessagesFromUser(userId);
}

export const getUserAvatar = (userId: string): ThunkType => async (dispatch) => {
    chatAPI.getUserAvatar(userId);
}

export default chatReducer;