const SET_SEARCH = 'SET_SEARCH';

const initialState = {
    searchText: ''
};

const searchReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SEARCH: {
            return {
                ...state,
                searchText: action.searchText
            }
        }

        default: 
            return state;
    }
}


export const setSearchText = (searchText) => {
    return {type: SET_SEARCH, searchText};
}

export default searchReducer;
