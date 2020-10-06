import { blogAPI } from "../api/kirav-api";

const SET_CATEGORY = 'SET_CATEGORY';

let initialState = {
    category: null,
    listCategories: null
};

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CATEGORY: {
            return {
                ...state,
                category: action.category,
                listCategories: action.listCategories
            }
        }
        default: 
            return state;
    }
}

export const setCategory = (category, listCategories) => {
    return { type: SET_CATEGORY, category, listCategories };
}

export const getCategoryEdit = (categoryId) => (dispatch) => {
    blogAPI.getCategoryEdit(categoryId).then(data => {
        dispatch(setCategory(data.category, data.categories));
    });
}

export const postCategoryEdit = (category) => (dispatch) => {
    blogAPI.postCategoryEdit(category).then(data => {        
        dispatch(setCategory(data.category, data.categories));
    });
}


export default categoryReducer;