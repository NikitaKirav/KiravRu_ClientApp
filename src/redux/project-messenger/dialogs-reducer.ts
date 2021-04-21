import { InferActionsTypes } from "../redux-store";

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}


let initialState = {
    dialogs: [
        {id: 1, name: 'Nikita' },
        {id: 2, name: 'Andrey' },
        {id: 3, name: 'Mihalych' },
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi' },
        {id: 2, message: 'Hoy' },
        {id: 3, message: 'Hola' },
        {id: 4, message: "It's my seat!" },
        {id: 5, message: 'Bazzinga' },
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'project-messenger/dialogs/SEND_MESSAGE': {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [ ...state.messages, {id: 6, message: body }],
            };
        }
        default:
            return state;
    }
    
}

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    sendMessage: (newMessageBody: string) => {
        return { type: 'project-messenger/dialogs/SEND_MESSAGE', newMessageBody } as const;
    }
} 

export default dialogsReducer;