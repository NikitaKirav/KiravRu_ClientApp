/** Absolute imports */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';

/** Components */
import Article from './article';
import Preloader from '../../../../components/common/Preloader/preloader';

/** Store */
import { getArticle, actions } from '../../../../redux/article-reducer';
import { AppStateType } from '../../../../redux/redux-store';

/** Types */
import { ArticleType } from '../../../../types/types';

type MapStatePropsType = {
    article: ArticleType
}
type MapDispatchPropsType = {
    getArticle: (articleId: number) => void
    removeArticle: () => void
}
type OwnPropsType = {
    match: any
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const ArticleContainer: React.FC<PropsType> = (props) => {

    const { articleId } = useParams();

    useEffect(() => {
        props.getArticle(parseInt(articleId));
        return () => {
            props.removeArticle();
        }
    },[]);

    if(!props.article) {
        return <Preloader />;
    }
    
    return <Article article={props.article} />;
}

let mapStateToProps = (state: AppStateType) => {
    return {
        article: state.articlePage.article
    }
}

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { getArticle, removeArticle: actions.removeArticle })
    )(ArticleContainer);