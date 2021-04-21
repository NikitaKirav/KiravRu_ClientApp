import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './auth-main-reducer';
import { AppStateType, InferActionsTypes } from './redux-store';

let initialState = {
    initialized: false
};

type InitialStateType = typeof initialState;

const appMainReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'app/INITIALIZED_SUCCESS': {
            return {
                ...state, 
                initialized: true
            };
        }
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    initializedSuccess: () => ({ type: 'app/INITIALIZED_SUCCESS' }) as const
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>;

export const initializeApp = ():ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());    
    Promise.all([promise])
        .then(() => {            
        dispatch(actions.initializedSuccess());
        });    
}


export default appMainReducer;