import { blogAPI } from "../api/blog-api";
import {checkLifetimeToken} from './auth-main-reducer';
import { ArticleShortType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    articles: null as Array<ArticleShortType> | null,
    pageSize: 10,
    totalArticlesCount: 10,
    currentPage: 1,  
    searchText: '',
    errors: '',
    changeArticles: false         
}

export type ArticlesStateType = typeof initialState;

const articlesReducer = (state = initialState, action: ActionsType): ArticlesStateType => {
    switch(action.type) {
        case 'articles/SET_ARTICLES':  {
            return {
                ...state,
                articles: action.articles,
                totalArticlesCount: action.totalArticlesCount,
                errors: action.errors
            };
        }
        case 'articles/SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'articles/REMOVE_ARTICLES': {
            return {
                ...state,
                articles: null,
                currentPage: 1
            };
        }
        case 'articles/ADD_TEXT_SEARCH': {
            return {
                ...state,
                searchText: action.searchText
            }
        }
        case 'articles/CHANGE_ARTICLES': {
            return {
                ...state,
                changeArticles: !state.changeArticles
            };
        }        
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
    setArticles: (articles: Array<ArticleShortType>, totalArticlesCount: number, errors: string) => {
        return { type: 'articles/SET_ARTICLES', articles, totalArticlesCount, errors } as const;
    },
    changeArticles: () => {
        return { type: 'articles/CHANGE_ARTICLES' } as const;
    },
    setCurrentPage: (pageIndex: number) => {
        return { type: 'articles/SET_CURRENT_PAGE', currentPage: pageIndex } as const;
    },
    removeArticles: () => {
        return { type: 'articles/REMOVE_ARTICLES' } as const;
    },
    addTextSearch: (searchText: string) => {
        return { type: 'articles/ADD_TEXT_SEARCH', searchText } as const;
    }
}

type ThunkType = BaseThunkType<ActionsType>;

export const setChangeArticles = (): BaseThunkType<ActionsType, void> => (dispatch) => {
    dispatch(actions.changeArticles());
}

export const getArticles = (pageIndex: number, pageSize: number, s: string, sort: string): ThunkType => async (dispatch) => {
    checkLifetimeToken();
    let articles = await blogAPI.getArticles(pageIndex, pageSize, s, sort);
    dispatch(actions.setArticles(articles.items, articles.totalCount, articles.errors));
    dispatch(actions.setCurrentPage(pageIndex));
}

export const getArticleDelete = (articleId: number): ThunkType => async (dispatch) => {
    let isToken = checkLifetimeToken();
    if (isToken) {
        await blogAPI.articleDelete(articleId)
        dispatch(actions.changeArticles());
    }
}


export default articlesReducer;