import { blogAPI } from "../api/kirav-api";

const SET_CATEGORIES = 'SET_CATEGORIES';
const CHANGE_CATEGORIES = 'CHANGE_CATEGORIES';

let initialState = {
    categories: null,
    totalCategoriesCount: 0,
    search: null,
    errors: null,
    changeCategories: false     
};

const categoriesReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CATEGORIES: {
            return {
                ...state,
                categories: action.categories,
                totalCategoriesCount: action.totalCategoriesCount
            }
        }
        case CHANGE_CATEGORIES: {
            return {
                ...state,
                changeCategories: !state.changeCategories
            }
        }
        default: 
            return state;
    }
}

export const changeArticles = () => {
    return {
        type: CHANGE_CATEGORIES
    }
}

export const setCategories = (categories, totalCategoriesCount) => {
    return { type: SET_CATEGORIES, categories, totalCategoriesCount };
}

export const getCategories = (search = '') => (dispatch) => {
    blogAPI.getCategories(search).then(responce => {
        dispatch(setCategories(responce.data.categories, responce.data.totalCategoriesCount));
    });
}

export const deleteCategory = (categoryId) => (dispatch) => {
    blogAPI.getCategoryDelete(categoryId).then(() => {
        dispatch(changeArticles());
    });
} 

export default categoriesReducer;