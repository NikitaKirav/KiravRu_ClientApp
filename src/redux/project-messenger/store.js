import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 2, message: 'I cool guy', likesCount: '5' },
                {id: 3, message: 'Me llamo Nikita', likesCount: '8' },
            ],
            newPostText: 'Oh my God!'                
        },
        dialogsPage: {
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
            ],
            newMessageBody: ''
        },
        sidebar: {
            friends: [
                {id: 1, name: 'Nikita' },
                {id: 2, name: 'Andrey' },
                {id: 3, name: 'Mihalych' },
            ]
        }  
    
    },

    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    }, 

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
}


window.store = store;

export default store;