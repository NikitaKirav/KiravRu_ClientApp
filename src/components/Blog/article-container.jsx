import React, { Component } from 'react';
import { connect } from 'react-redux';
import Article from './article.jsx';
import { getArticle, removeArticle } from '../../redux/article-reducer.js';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import Preloader from '../common/Preloader/preloader.js';

class ArticleContainer extends Component {

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

let mapStateToProps = (state) => {
    return {
        article: state.articlePage.article
    }
}

export default compose(
    connect(mapStateToProps, { getArticle, removeArticle }),
    withRouter,
    )(ArticleContainer);