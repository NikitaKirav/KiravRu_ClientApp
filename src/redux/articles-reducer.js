import { blogAPI } from "../api/kirav-api.js";
import {checkLifetimeToken} from './auth-main-reducer.js';

const SET_ARTICLES = 'SET_ARTICLES';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const REMOVE_ARTICLES = 'REMOVE_ARTICLES';
const ADD_TEXT_SEARCH = 'ADD_TEXT_SEARCH';
const CHANGE_ARTICLES = 'CHANGE_ARTICLES';

let initialState = {
    articles: null,
    pageSize: 10,
    totalArticlesCount: 10,
    currentPage: 1,  
    searchText: '',
    errors: '',
    changeArticles: false         
}

const articlesReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ARTICLES:  {
            return {
                ...state,
                articles: action.articles,
                totalArticlesCount: action.totalArticlesCount,
                errors: action.errors
            };
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case REMOVE_ARTICLES: {
            return {
                ...state,
                articles: null,
                currentPage: 1
            };
        }
        case ADD_TEXT_SEARCH: {
            return {
                ...state,
                searchText: action.searchText
            }
        }
        case CHANGE_ARTICLES: {
            return {
                ...state,
                changeArticles: !state.changeArticles
            };
        }        
        default:
            return state;
    }
}

export const setArticles = (articles) => {
    return {
        type: SET_ARTICLES, 
        articles: articles.data.items,
        totalArticlesCount: articles.data.totalCount,
        errors: articles.data.errors
    }
}

export const changeArticles = () => {
    return {
        type: CHANGE_ARTICLES
    }
}

export const setCurrentPage = (pageIndex) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: pageIndex
    }
}

export const removeArticles = () => {
    return { type: REMOVE_ARTICLES }
}

export const addTextSearch = (searchText) => {
    return { type: ADD_TEXT_SEARCH, searchText }
}

export const setChangeArticles = () => (dispatch) => {
    dispatch(changeArticles());
}

export const getArticles = (pageIndex, pageSize, s, sort) => (dispatch) => {
    checkLifetimeToken()(dispatch);
    blogAPI.getArticles(pageIndex, pageSize, s, sort).then(articles => {
         dispatch(setArticles(articles));
         dispatch(setCurrentPage(pageIndex));
    });       
}

export const getArticleDelete = (articleId) => (dispatch) => {
    let isToken = checkLifetimeToken()(dispatch);
    if (isToken) {
        blogAPI.getArticleDelete(articleId).then(() => {
            dispatch(changeArticles());
        });
    }
}


export default articlesReducer;