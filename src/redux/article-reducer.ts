import { blogAPI } from "../api/blog-api";
import {checkLifetimeToken} from './auth-main-reducer';
import { actions as actionsArticles } from './articles-reducer';
import { ArticleType, CategoryType, RoleType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    article: null as ArticleType | null,
    listCategories: null as Array<CategoryType> | null,
    listRoles: null as Array<RoleType> | null
}

export type InitialStateType = typeof initialState;

const articleReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'article/SET_ARTICLE':  {
            return {
                article: action.article,
                listCategories: null, //! This line may be superfluous
                listRoles: null //! This line may be superfluous
            };
        }
        case 'article/REMOVE_ARTICLE': {
            return {
                article: null,
                listCategories: null,
                listRoles: null
            };
        }
        case 'article/SET_ARTICLE_EDIT': {
            return {
                ...state,
                article: action.article,
                listCategories: action.listCategories,
                listRoles: action.listRoles
            };
        }
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    setArticle: (article: ArticleType) => {
        return { type: 'article/SET_ARTICLE', article } as const;
    },
    setArticleEdit: (article: ArticleType, listCategories: Array<CategoryType>, listRoles: Array<RoleType>) => {
        return { type: 'article/SET_ARTICLE_EDIT', article, listCategories, listRoles } as const;
    },
    removeArticle: () => {
        return { type: 'article/REMOVE_ARTICLE' } as const;
    }
} 

type ThunkType = BaseThunkType<ActionsType>;

export const getArticle = (articleId: number):ThunkType => async (dispatch) => {
    try {
        checkLifetimeToken();
        let data = await blogAPI.getArticle(articleId);
        dispatch(actions.setArticle(data)); 
    } catch(err) { console.error(err); }      
}

export const getArticleEdit = (articleId: number): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        try {
            let {article, categories, roles} = await blogAPI.getArticleForEditing(articleId);
            dispatch(actions.setArticleEdit(article, categories, roles));
        } catch(err) { console.error(err); } 
    }
}

export const postArticleEdit = (article: ArticleType, roles: Array<RoleType>): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        try {
            let response = await blogAPI.postArticleEdit(article, roles);        
            dispatch(actions.setArticleEdit(response.article, response.categories, response.roles));
            dispatch(actionsArticles.changeArticles);
        } catch(err) { console.error(err); } 
    }
}

export default articleReducer;