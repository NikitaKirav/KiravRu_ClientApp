import { blogAPI } from "../api/kirav-api.js";
import {checkLifetimeToken} from './auth-main-reducer.js';
import { changeArticles } from './articles-reducer.js';

const SET_ARTICLE = 'SET_ARTICLE';
const REMOVE_ARTICLE = 'REMOVE_ARTICLE';
const SET_ARTICLE_EDIT = 'SET_ARTICLE_EDIT';

let initialState = {
    article: null,
    listCategories: null,
    listRoles: null
}

const articleReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ARTICLE:  {
            return {
                article: action.article
            };
        }
        case REMOVE_ARTICLE: {
            return {
                article: null,
                listCategories: null,
                listRoles: null
            };
        }
        case SET_ARTICLE_EDIT: {
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

export const setArticle = (article) => {
    return {
        type: SET_ARTICLE, 
        article
    }
}

export const setArticleEdit = (article, listCategories, listRoles) => {
    return {
        type: SET_ARTICLE_EDIT,
        article, listCategories, listRoles
    }
}

export const removeArticle = () => {
    return { type: REMOVE_ARTICLE }
}


export const getArticle = (articleId) => (dispatch) => {
    checkLifetimeToken()(dispatch);
    blogAPI.getArticle(articleId).then(data => {
         dispatch(setArticle(data));
    });       
}

export const getArticleEdit = (articleId) => (dispatch) => {
    let isToken = checkLifetimeToken()(dispatch);
    if (isToken) {
        blogAPI.getArticleEdit(articleId).then(data => {
            dispatch(setArticleEdit(data.article, data.categories, data.roles));
        });
    }
}

export const postArticleEdit = (article, roles) => (dispatch) => {
    let isToken = checkLifetimeToken()(dispatch);
    if (isToken) {
        blogAPI.postArticleEdit(article, roles).then(data => {        
            dispatch(setArticleEdit(data.article, data.categories, data.roles));
            dispatch(changeArticles());
        });
    }
}

export default articleReducer;