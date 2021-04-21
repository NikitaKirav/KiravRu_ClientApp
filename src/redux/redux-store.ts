import {createStore, combineReducers, applyMiddleware, Action} from 'redux';
import profileReducer from './project-messenger/profile-reducer';
import dialogsReducer from './project-messenger/dialogs-reducer';
import sidebarReducer from './project-messenger/sidebar-reducer';
import usersReducer from './project-messenger/users-reducer';
import authReducer from './project-messenger/auth-reducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './project-messenger/app-reducer';
import articlesReducer from './articles-reducer';
import articleReducer from './article-reducer';
import authMainReducer from './auth-main-reducer';
import appMainReducer from './app-main-reducer';
import searchReducer from './search-reducer';
import categoriesReducer from './categories-reducer';
import usersAdmReducer from './users-adm-reducer';
import userAdmReducer from './user-adm-reducer';
import categoryReducer from './category-reducer';
import roleAdmReducer from './role-adm-reducer';
import fileBrowseReducer from './file-browse-reducer';
import projectArtCanvasReducer from './project-artcanvas/project-artcanvas-reducer';
import messageReducer from './message-reducer';
import chatReducer from './project-messenger/chat-reducer';

let rootReducer = combineReducers({
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
    message: messageReducer,
    chat: chatReducer
});

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never;

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;