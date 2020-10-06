import React from 'react';
import { Route } from 'react-router';
import ArticlesAdm from './Articles/articles-adm.jsx';
import './main-part-adm.less';
import CategoriesAdm from './Categories/categories-adm.jsx';
import Users from './Users/users.jsx';
import Roles from './Roles/roles.jsx';
import EditArticleContainer from './Articles/Edit/edit-article-container.jsx';
import EditCategoryContainer from './Categories/Edit/edit-category-container.jsx';
import EditUserContainer from './Users/Edit/edit-user-container.jsx';
import ChangePasswordContainer from './Users/Edit/change-password-container.jsx';
import CreateRoleContainer from './Roles/Edit/create-role-container.jsx';
import UsersList from './Roles/UsersList/users-list.jsx';
import EditAccessContainer from './Roles/UsersList/edit-access-container.jsx';


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