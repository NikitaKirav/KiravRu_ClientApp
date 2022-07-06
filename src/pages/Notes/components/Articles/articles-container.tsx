/** Absolute imports */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useSearchParams } from 'react-router-dom';

/** Components */
import Articles from './articles';
import Preloader from '../../../../components/common/Preloader/preloader';

/** Store */
import { getArticles, actions, ArticlesStateType } from '../../../../redux/articles-reducer';
import { AppStateType } from '../../../../redux/redux-store';


type MapStatePropsType = {
    blog: ArticlesStateType
}

type MapDispatchPropsType = {
    getArticles: (currentPage: number, pageSize: number, search: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;


const ArticlesContainer: React.FC<PropsType> = (props) => {

    const [searchParams, setSearchParams] = useSearchParams(); 

    useEffect(() => {
        let pageIndex = parseInt(searchParams.get("page"));
        let search = searchParams.get("s") ?? '';
        let currentPage = props.blog.currentPage;
        if (pageIndex)
            currentPage = pageIndex;
        props.getArticles(currentPage, props.blog.pageSize, search);
    },[]);


    
    const onPageChanged = (pageIndex: number) => {
        let search = searchParams.get("s") ?? '';
        props.getArticles(pageIndex, props.blog.pageSize, search);
    }

    if(!props.blog.articles) {
        return <Preloader />;
    }

    return <Articles blog={props.blog} 
            onPageChanged={onPageChanged.bind(this)} />
}

let mapStateToProps = (state: AppStateType) => {
    return {
        blog: state.blog
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getArticles, removeArticles: actions.removeArticles })
    )(ArticlesContainer);