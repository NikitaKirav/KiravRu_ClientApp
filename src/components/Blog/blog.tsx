import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import FindTextFormRedux from '../SearchBlog/search-blog';
import ArticlesContainer from './articles-container';
import ArticleContainer from './article-container';
import useLocationState from '../../packages/ui/hooks/location';
import qs from 'qs';
import { connect } from 'react-redux';
import {actions, getArticles} from '../../redux/articles-reducer';
import { AppStateType } from '../../redux/redux-store';
import Preloader from '../common/Preloader/preloader';


const Blog = (props) => {
    const [query, pushState] = useLocationState();
    const onSearching = (values) => {
        pushState(`/blog?${qs.stringify({ ...query, s: values.searchText, page: 1 })}`);
        props.addTextSearch(values.searchText);
        props.getArticles(1, props.pageSize, values.searchText);
    }

    return (
        <div className="blog">
            <FindTextFormRedux onSubmit={onSearching}  />
            <Route exact path='/blog' render={ () => <ArticlesContainer /> }  />
            <Route path='/blog/:articleId' render={ () => <ArticleContainer /> } />
        </div>
    );
}

const mapStateToProps = (state: AppStateType) => {
    return {
        pageSize: state.blog.pageSize
    }
}

const BlogContainer = connect(mapStateToProps, {addTextSearch: actions.addTextSearch, getArticles})(Blog);

export default BlogContainer;
