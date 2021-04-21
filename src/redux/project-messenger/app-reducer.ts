import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from '../redux-store';
import { getAuthUserData } from './auth-reducer';

let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'project-messenger/app/INITIALIZED_SUCCESS': {
            return { 
                ...state, 
                initialized: true
            }
        }
        default:
            return state;
    }
    
}
type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    initializedSuccess: () => ({ type: 'project-messenger/app/INITIALIZED_SUCCESS' }) as const
}


type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>;

export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
        dispatch(actions.initializedSuccess());
        });    
}


export default appReducer;