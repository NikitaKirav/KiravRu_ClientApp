import { InferActionsTypes } from "./redux-store";

const initialState = {
    searchText: ''
};

type InitialStateType = typeof initialState;

const searchReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'search/SET_SEARCH': {
            return {
                ...state,
                searchText: action.searchText
            }
        }

        default: 
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    setSearchText: (searchText: string) => {
        return {type: 'search/SET_SEARCH', searchText} as const;
    }
}

export default searchReducer;
