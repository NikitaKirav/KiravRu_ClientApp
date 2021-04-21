import React from 'react';
import { Route } from 'react-router';
import './main-part-adm.less';
import ArticlesAdm from './Articles/articles-adm';
import EditArticleContainer from './Articles/Edit/edit-article-container';

const EditCategoryContainer = React.lazy(() => import('./Categories/Edit/edit-category-container'));
const CategoriesAdm = React.lazy(() => import('./Categories/categories-adm'));
const Users = React.lazy(() => import('./Users/users'));
const EditUserContainer = React.lazy(() => import('./Users/Edit/edit-user-container'));
const ChangePasswordContainer = React.lazy(() => import('./Users/Edit/change-password-container'));
const Roles = React.lazy(() => import('./Roles/roles'));
const CreateRoleContainer = React.lazy(() => import('./Roles/Edit/create-role-container'));
const UsersList = React.lazy(() => import('./Roles/UsersList/users-list'));
const EditAccessContainer = React.lazy(() => import('./Roles/UsersList/edit-access-container'));

const MainPartAdm = (props) => {
    return (
        <div className="mainPart">
            <Route exact path='/adminBoard/articles' render={() => <ArticlesAdm searchText={props.searchText} />} />
            <Route path='/adminBoard/articles/:articleId' render={(props) => <EditArticleContainer match={props.match} />} />
            <Route path='/adminBoard/categories/:categoryId' render={(props) => <EditCategoryContainer match={props.match} />} />
            <Route exact path='/adminBoard/categories' render={() => <CategoriesAdm searchText={props.searchText} />} />
            <Route exact path='/adminBoard/users' render={() => <Users searchText={props.searchText} />} />
            <Route exact path='/adminBoard/users/:userId' render={(props) => <EditUserContainer match={props.match} />} />
            <Route path='/adminBoard/users/changePassword/:userId' render={(props) => <ChangePasswordContainer match={props.match} />} />
            <Route exact path='/adminBoard/roles' render={() => <Roles searchText={props.searchText} />} />   
            <Route exact path='/adminBoard/roles/create' render={() => <CreateRoleContainer  />} />  
            <Route exact path='/adminBoard/roles/userList' render={() => <UsersList searchText={props.searchText} />} />  
            <Route path='/adminBoard/roles/userList/:userId' render={(props) => <EditAccessContainer match={props.match} />} />        
        </div>
    );
}

export default MainPartAdm;