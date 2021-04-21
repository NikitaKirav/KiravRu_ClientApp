import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import s from './articles.module.less';
import Pagination from '../common/Pagination/pagination';
import Difficulty from './difficulty';
import useLocationState from '../../packages/ui/hooks/location';
import { ArticleType } from '../../types/types';
import { ArticlesStateType } from '../../redux/articles-reducer';

type PropsType = {
    blog: ArticlesStateType
    onPageChanged: (pageIndex: number) => void
}

let Articles: React.FC<PropsType> = (props) => {
    const [{ query }] = useLocationState();
    return <div className={s.pageWrap}>
        {query.s != null ? `Results for "${query.s}", ${props.blog.totalArticlesCount} articles found` : ""}
        {
        props.blog.articles.map((item, index) => <div key={item.id}>
        <article className={s.homeArticle}>
                <table className={s.tableArticle}>
                <tbody>
                    <tr>
                        <td className={s.titleArticle}>
                            <h1>
                                <NavLink to={`/blog/${item.id}`} >
                                    #{item.id}: {item.title}
                                </NavLink>
                            </h1>
                        </td>
                        <td className={s.difficulty}>
                            <Difficulty difficultyLevel={item.difficultyLevel} />
                        </td>
                    </tr>
                    </tbody>
                </table>
            <time className={s.blockTime}>{item.dateCreate}</time>
            <div className={s.articleText}>
                {item.description}
            </div>
        </article>   
        <Border lastArticle={props.blog.articles.length > index + 1} />
        </div>
        )        
        }
        <Pagination totalCount={props.blog.totalArticlesCount} 
                    pageSize={props.blog.pageSize} 
                    currentPage={props.blog.currentPage} 
                    onPageChanged={props.onPageChanged} />
    </div>
}

type BorderPropsType = {
    lastArticle: boolean
}

const Border: React.FC<BorderPropsType> = (props) => {
    if(props.lastArticle) {
        return <div className={s.borderLine}></div>
    }
    else {
        return <></>;
    }
}


export default Articles;