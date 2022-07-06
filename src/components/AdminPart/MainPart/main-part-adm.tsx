import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
            <Routes>
                <Route path='/adminBoard/articles' element={<ArticlesAdm searchText={props.searchText} />} />
                <Route path='/adminBoard/articles/:articleId' element={<EditArticleContainer match={props.match} />} />
                <Route path='/adminBoard/categories/:categoryId' element={<LazyLoadComponent component={<EditCategoryContainer match={props.match} />} />} />
                <Route path='/adminBoard/categories' element={<LazyLoadComponent component={<CategoriesAdm searchText={props.searchText} />} />} />
                <Route path='/adminBoard/users' element={<LazyLoadComponent component={<Users searchText={props.searchText} />} />} />
                <Route path='/adminBoard/users/:userId' element={<LazyLoadComponent component={<EditUserContainer match={props.match} />}/>} />
                <Route path='/adminBoard/users/changePassword/:userId' element={<LazyLoadComponent component={<ChangePasswordContainer match={props.match} />}/>} />
                <Route path='/adminBoard/roles' element={<LazyLoadComponent component={<Roles searchText={props.searchText} />}/>} />   
                <Route path='/adminBoard/roles/create' element={<LazyLoadComponent component={<CreateRoleContainer  />}/>} />  
                <Route path='/adminBoard/roles/userList' element={<LazyLoadComponent component={<UsersList searchText={props.searchText} />}/>} />  
                <Route path='/adminBoard/roles/userList/:userId' element={<LazyLoadComponent component={<EditAccessContainer match={props.match} />}/>} /> 
            </Routes>       
        </div>
    );
}


export default MainPartAdm;