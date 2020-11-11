import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './blog.less';
import FindTextFormRedux from '../SearchBlog/search-blog.jsx';
import ArticlesContainer from './articles-container.jsx';
import ArticleContainer from './article-container.jsx';
import useLocationState from '../../packages/ui/hooks/location.js';
import qs from 'qs';
import { connect } from 'react-redux';
import {addTextSearch, getArticles} from '../../redux/articles-reducer.js';


const Blog = (props) => {
    const [{ query }, pushState] = useLocationState();
    const onSearching = (values) => {
        pushState(`/blog?${qs.stringify({ ...query, s: values.searchText, page: 1 })}`);
        props.addTextSearch(values.searchText);
        props.getArticles(1, props.blog.pageSize, values.searchText);
    }

    return (
        <div className="blog">
            <FindTextFormRedux onSubmit={onSearching}  />
            <Route exact path='/blog' render={ () => <ArticlesContainer /> }  />
            <Route path='/blog/:articleId' render={ () => <ArticleContainer /> } />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blog: state.blog
    }
}

const BlogContainer = connect(mapStateToProps, {addTextSearch, getArticles})(Blog);

export default BlogContainer;
