import { blogAPI } from "../api/blog-api";
import { CategoryType } from "../types/types";
import {checkLifetimeToken} from './auth-main-reducer';
import { BaseThunkType, InferActionsTypes } from "./redux-store";

const SET_CATEGORY = 'category/SET_CATEGORY';

let initialState = {
    category: null as CategoryType | null,
    listCategories: null as Array<CategoryType>
};

type InitialStateType = typeof initialState;

const categoryReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'category/SET_CATEGORY': {
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

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    setCategory: (category: CategoryType, listCategories: Array<CategoryType>) => {
        return { type: 'category/SET_CATEGORY', category, listCategories } as const;
    }
}

type ThunkType = BaseThunkType<ActionsType>;

export const getCategoryEdit = (categoryId: number): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        let data = await blogAPI.getCategoryEdit(categoryId);
        dispatch(actions.setCategory(data.category, data.categories));
    }
}

export const postCategoryEdit = (category: CategoryType): ThunkType => async (dispatch) => {
    checkLifetimeToken();
    let data = await blogAPI.postCategoryEdit(category);        
    dispatch(actions.setCategory(data.category, data.categories));
}


export default categoryReducer;