import React, { Component } from 'react';
import { connect } from 'react-redux';
import Articles from './articles';
import { getArticles, actions, ArticlesStateType } from '../../redux/articles-reducer';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'redux';
import Preloader from '../common/Preloader/preloader';
import { Description } from '../Description/description';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    blog: ArticlesStateType
}
type PathParamsType = {

}

type MapDispatchPropsType = {
    getArticles: (currentPage: number, pageSize: number, search: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>;


class ArticleContainer extends Component<PropsType> {

    componentDidMount() {
        let pageIndex = parseInt(this.getPage(this.props.location.search));
        let search = this.getSearch(this.props.location.search) ?? '';
        let currentPage = this.props.blog.currentPage;
        if (pageIndex) {
            currentPage = pageIndex;
        }
        this.props.getArticles(currentPage, this.props.blog.pageSize, search);
    }
   
    onPageChanged(pageIndex: number) {
        let search = this.getSearch(this.props.location.search) ?? '';
        this.props.getArticles(pageIndex, this.props.blog.pageSize, search);
    }


    getPage(params: string) {
        let search = this.getUrlParams(params);
        return search.get("page") || "";
    }

    getSearch(params: string) {
        let search = this.getUrlParams(params);
        return search.get("s") || "";
    }
    
    getUrlParams(params: string) {
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

let mapStateToProps = (state: AppStateType) => {
    return {
        blog: state.blog
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getArticles, removeArticles: actions.removeArticles }),
    withRouter,
    )(ArticleContainer);