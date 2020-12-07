import {createStore, combineReducers, applyMiddleware} from 'redux';
import profileReducer from './profile-reducer.js';
import dialogsReducer from './dialogs-reducer.js';
import sidebarReducer from './sidebar-reducer.js';
import usersReducer from './users-reducer.js';
import authReducer from './auth-reducer.js';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reducer.js';
import articlesReducer from './articles-reducer.js';
import articleReducer from './article-reducer.js';
import authMainReducer from './auth-main-reducer.js';
import appMainReducer from './app-main-reducer.js';
import searchReducer from './search-reducer.js';
import categoriesReducer from './categories-reducer.js';
import usersAdmReducer from './users-adm-reducer.js';
import userAdmReducer from './user-adm-reducer.js';
import categoryReducer from './category-reducer.js';
import roleAdmReducer from './role-adm-reducer.js';
import fileBrowseReducer from './file-browse-reducer.js';
import projectArtCanvasReducer from './project-artcanvas/project-artcanvas-reducer.js';
import messageReducer from './message-reducer.js';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    blog: articlesReducer,
    articlePage: articleReducer,
    authMain: authMainReducer,
    appMain: appMainReducer,
    search: searchReducer,
    categories: categoriesReducer,
    usersAdm: usersAdmReducer,
    userAdm: userAdmReducer,
    category: categoryReducer,
    roleAdm: roleAdmReducer,
    fileBrowse: fileBrowseReducer,
    projectArtCanvas: projectArtCanvasReducer,
    message: messageReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;