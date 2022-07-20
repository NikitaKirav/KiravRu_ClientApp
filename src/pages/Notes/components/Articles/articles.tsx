/** Absolute imports */
import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

/** Components */
import Pagination from '../../../../components/common/Pagination/pagination';
import Difficulty from '../../../../components/Difficulty/difficulty';

/** Store */
import { ArticlesStateType } from '../../../../redux/articles-reducer';

/** Styles */
import s from './articles.module.less';


type PropsType = {
    blog: ArticlesStateType
    onPageChanged: (pageIndex: number) => void 
}

const Articles: React.FC<PropsType> = (props) => {

    const [searchParams, setSearchParams] = useSearchParams();
    return <div className={s.pageWrap}>

        <h1>Notes</h1>
        <div className={s.description}>This is where I post announcements, tips and tricks, new and updated features, 
                fun roundups, new podcast episodes, and more.</div>
        <div className={s.borderLineFat}></div>

        {searchParams.get('s') != null ? <div className={s.searchResult}>{`Results for "${searchParams.get('s')}", ${props.blog.totalArticlesCount} articles found`}</div> : ""}
        
        {props.blog.articles.map((item, index) => <div key={item.id}>
            <article className={s.homeArticle}>
                    <table className={s.tableArticle}>
                    <tbody>
                        <tr>
                            <td className={s.titleArticle}>
                                <h1>
                                    <NavLink to={`/notes/${item.id}`} >
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