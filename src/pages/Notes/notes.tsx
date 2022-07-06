/** Absolute imports */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

/** Components */
import ArticlesContainer from './components/Articles/articles-container';
import ArticleContainer from './components/Article/article-container';

/** Store */
import {actions, getArticles} from '../../redux/articles-reducer';
import { AppStateType } from '../../redux/redux-store';


const Notes = (props) => {
    //const [query, pushState] = useLocationState();

    const onSearching = (values) => {
        /*pushState(`/blog?${qs.stringify({ ...query, s: values.searchText, page: 1 })}`);
        props.addTextSearch(values.searchText);
        props.getArticles(1, props.pageSize, values.searchText);*/
    }

    return (
        <div className="blog">
           {/* <FindTextFormRedux onSubmit={onSearching}  />*/}
            <Routes>
                <Route path='/' element={<ArticlesContainer />}  />
                <Route path=':articleId' element={<ArticleContainer />}  />
            </Routes>
        </div>
    );
}

const mapStateToProps = (state: AppStateType) => {
    return {
        pageSize: state.blog.pageSize
    }
}

const NotesContainer = connect(mapStateToProps, {addTextSearch: actions.addTextSearch, getArticles})(Notes);

export default NotesContainer;
