import React, { useEffect, useState } from 'react';
import {getArticles, getArticleDelete} from '../../../../redux/articles-reducer';

import './articles-adm.less';
import { connect } from 'react-redux';
import Preloader from '../../../common/Preloader/preloader';
import Pagination from '../../../common/Pagination/pagination';
import { useLocation } from 'react-router';
import useLocationState from '../../../../packages/ui/hooks/location';
import { NavLink } from 'react-router-dom';
import Modal from '../../../common/ModalWindow/modal';

const ArticlesAdm = (props) => {

    let locationState = useLocationState();
    let location = useLocation();
    useEffect(() => {
        let pageIndex = parseInt(locationState[0].query['page']);
        let search = locationState[0].query['search'] ?? '';
        let currentPage = pageIndex || 1;
        props.getArticles(currentPage, props.pageSize, search);
    },[props.changeArticles, location]);

    const deleteArticle = (articleId) => {
        props.getArticleDelete(articleId);
    }

    const onPageChanged = (pageIndex: number) => {
        let search = getSearch(location.search) ?? '';
        props.getArticles(pageIndex, props.pageSize, search);
    }

    const getSearch = (params: string) => {
        let search = getUrlParams(params);
        return search.get("s") || "";
    }
    
    const getUrlParams = (params: string) => {
        if (!params) return new URLSearchParams();
        return new URLSearchParams(params);
    }

    if(!props.articles) {
        return <Preloader />;
    }

    return (
        <div className="listArticles">
            <div className="title">
                <h1>Notes</h1>
            </div>
            <br />
            <div className="createNewArticle">
                <NavLink to={`/adminBoard/articles/0`} className="btn btnSuccess">Create new article</NavLink>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">ShortDescription</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <Articles articles={props.articles} deleteArticle={deleteArticle} />
                </tbody>
            </table>
            <div className="pagination">
                <Pagination totalCount={props.totalArticlesCount} 
                        pageSize={props.pageSize} 
                        currentPage={props.currentPage} 
                        onPageChanged={onPageChanged} />
            </div>
        </div>
    );
} 

const Articles = ({articles, deleteArticle}) => {

    let [isOpen, setIsOpen] = useState(false);
    let [articleId, setId] = useState(0);
    
    const onDelete = (id) => {
        setIsOpen(true);
        setId(id);
    }

    const handleSubmit = () => {
        deleteArticle(articleId);
        setIsOpen(false);
    }
    
    const handleCancel = () => {
        setIsOpen(false);
    }

    return (
        articles.map(article => {
            return (
                <tr key={article.id}>
                    <th>
                        <input type="hidden" value={article.id} />
                        {article.title}
                    </th>
                    <th>{article.description}</th>
                    <th>
                        <NavLink to={`/adminBoard/articles/${article.id}`} className="btn btnPrimary">Edit</NavLink>
                        <button className="btn btnDanger" onClick={() => onDelete(article.id)}>Delete</button>
                        <Modal title="Delete article" isOpen={isOpen} onCancel={handleCancel} onSubmit={handleSubmit}>
                            <p>Are you sure you want to delete this article?</p>
                        </Modal>
                    </th>
                </tr>
            );
        })
    );
}

const mapStateToProps = (state) => ({
    articles: state.blog.articles,
    pageSize: 8,
    totalArticlesCount: state.blog.totalArticlesCount,
    currentPage: state.blog.currentPage,
    searchText: state.search.searchText,
    changeArticles: state.blog.changeArticles
});

export default connect(mapStateToProps, {getArticles, getArticleDelete})(ArticlesAdm);
