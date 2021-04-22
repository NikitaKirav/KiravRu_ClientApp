import React from 'react';
import { Route } from 'react-router';
import './main-part-adm.less';
import ArticlesAdm from './Articles/articles-adm';
import EditArticleContainer from './Articles/Edit/edit-article-container';
import { LazyLoadComponent } from '../../../app';


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
            <Route path='/adminBoard/categories/:categoryId' render={(props) => <LazyLoadComponent component={<EditCategoryContainer match={props.match} />} />} />
            <Route exact path='/adminBoard/categories' render={() => <LazyLoadComponent component={<CategoriesAdm searchText={props.searchText} />} />} />
            <Route exact path='/adminBoard/users' render={() => <LazyLoadComponent component={<Users searchText={props.searchText} />} />} />
            <Route exact path='/adminBoard/users/:userId' render={(props) => <LazyLoadComponent component={<EditUserContainer match={props.match} />}/>} />
            <Route path='/adminBoard/users/changePassword/:userId' render={(props) => <LazyLoadComponent component={<ChangePasswordContainer match={props.match} />}/>} />
            <Route exact path='/adminBoard/roles' render={() => <LazyLoadComponent component={<Roles searchText={props.searchText} />}/>} />   
            <Route exact path='/adminBoard/roles/create' render={() => <LazyLoadComponent component={<CreateRoleContainer  />}/>} />  
            <Route exact path='/adminBoard/roles/userList' render={() => <LazyLoadComponent component={<UsersList searchText={props.searchText} />}/>} />  
            <Route path='/adminBoard/roles/userList/:userId' render={(props) => <LazyLoadComponent component={<EditAccessContainer match={props.match} />}/>} />        
        </div>
    );
}


export default MainPartAdm;