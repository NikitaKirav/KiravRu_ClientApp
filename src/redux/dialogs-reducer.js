const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Nikita' },
        {id: 2, name: 'Andrey' },
        {id: 3, name: 'Mihalych' },
    ],

    messages: [
        {id: 1, message: 'Hi' },
        {id: 2, message: 'Hoy' },
        {id: 3, message: 'Hola' },
        {id: 4, message: "It's my seat!" },
        {id: 5, message: 'Bazzinga' },
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEND_MESSAGE: {
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

export const sendMessageCreator = (newMessageBody) => {
    return {
        type: SEND_MESSAGE, newMessageBody
    }
}

export default dialogsReducer;