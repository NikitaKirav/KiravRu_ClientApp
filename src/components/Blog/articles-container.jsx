import React, { Component } from 'react';
import { connect } from 'react-redux';
import Articles from './articles.jsx';
import { getArticles, removeArticles } from '../../redux/articles-reducer.js';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import Preloader from '../common/Preloader/preloader.js';
import { Description } from '../Description/description.jsx';


class ArticleContainer extends Component {

    componentDidMount() {
        let pageIndex = parseInt(this.getPage(this.props.location.search));
        let search = this.getSearch(this.props.location.search) ?? '';
        let currentPage = this.props.blog.currentPage;
        if (pageIndex) {
            currentPage = pageIndex;
        }
        this.props.getArticles(currentPage, this.props.blog.pageSize, search);
    }
   
    onPageChanged(pageIndex) {
        let search = this.getSearch(this.props.location.search) ?? '';
        this.props.getArticles(pageIndex, this.props.blog.pageSize, search);
    }


    getPage(params) {
        let search = this.getUrlParams(params);
        return search.get("page") || "";
    }

    getSearch(params) {
        let search = this.getUrlParams(params);
        return search.get("s") || "";
    }
    
    getUrlParams(params) {
        if (!params) return new URLSearchParams();
        return new URLSearchParams(params);
    }

    render() {
        if(!this.props.blog.articles) {
            return <Preloader />;
        }
        return <>     
            {this.props.location.search ? '' : <Description /> } 
            <Articles blog={this.props.blog} 
                onPageChanged={this.onPageChanged.bind(this)} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        blog: state.blog
    }
}

export default compose(
    connect(mapStateToProps, { getArticles, removeArticles }),
    withRouter,
    )(ArticleContainer);