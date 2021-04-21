import React from 'react';
import { Route } from 'react-router';
import ArticlesAdm from './Articles/articles-adm';
import './main-part-adm.less';
import CategoriesAdm from './Categories/categories-adm';
import Users from './Users/users';
import Roles from './Roles/roles';
import EditArticleContainer from './Articles/Edit/edit-article-container';
import EditCategoryContainer from './Categories/Edit/edit-category-container';
import EditUserContainer from './Users/Edit/edit-user-container';
import ChangePasswordContainer from './Users/Edit/change-password-container';
import CreateRoleContainer from './Roles/Edit/create-role-container';
import UsersList from './Roles/UsersList/users-list';
import EditAccessContainer from './Roles/UsersList/edit-access-container';


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