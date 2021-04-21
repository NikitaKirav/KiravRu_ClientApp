import { blogAPI } from "../api/blog-api";
import { CategoryType } from "../types/types";
import {checkLifetimeToken} from './auth-main-reducer';
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    categories: null as Array<CategoryType> | null,
    totalCategoriesCount: 0,
    search: null as string | null,
    errors: null as string | null,
    changeCategories: false     
};

type InitialStateType = typeof initialState;

const categoriesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'categories/SET_CATEGORIES': {
            return {
                ...state,
                categories: action.categories,
                totalCategoriesCount: action.totalCategoriesCount
            }
        }
        case 'categories/CHANGE_CATEGORIES': {
            return {
                ...state,
                changeCategories: !state.changeCategories
            }
        }
        default: 
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    changeArticles: () => {
        return { type: 'categories/CHANGE_CATEGORIES' } as const;
    },
    setCategories: (categories: Array<CategoryType>, totalCategoriesCount: number) => {
        return { type: 'categories/SET_CATEGORIES', categories, totalCategoriesCount } as const;
    }
}

type ThunkType = BaseThunkType<ActionsType>;

export const getCategories = (search = ''): ThunkType => async (dispatch) => {
    checkLifetimeToken();
    let responce = await blogAPI.getCategories();
    dispatch(actions.setCategories(responce.data.categories, responce.data.totalCategoriesCount));
}

export const deleteCategory = (categoryId: number): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        await blogAPI.getCategoryDelete(categoryId);
        dispatch(actions.changeArticles());
    }
} 

export default categoriesReducer;