import React, { Component } from 'react';
import { connect } from 'react-redux';
import Article from './article';
import { getArticle, actions } from '../../redux/article-reducer';
import { match, withRouter } from 'react-router';
import { compose } from 'redux';
import Preloader from '../common/Preloader/preloader';
import { AppStateType } from '../../redux/redux-store';
import { ArticleType } from '../../types/types';

type MapStatePropsType = {
    article: ArticleType
}
type MapDispatchPropsType = {
    getArticle: (articleId: number) => void
    removeArticle: () => void
}
type OwnPropsType = {
    match: match<any>
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class ArticleContainer extends Component<PropsType> {

    componentDidMount() {
        let articleId = this.props.match.params.articleId;
        this.props.getArticle(articleId);
    }

    componentWillUnmount() {
        this.props.removeArticle();
    }

    render() {
        if(!this.props.article) {
            return <Preloader />;
        }
        return <Article article={this.props.article} />;
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        article: state.articlePage.article
    }
}

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { getArticle, removeArticle: actions.removeArticle }),
    withRouter,
    )(ArticleContainer);