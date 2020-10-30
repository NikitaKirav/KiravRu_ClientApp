import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import s from './information-blocks.module.less';
import { connect } from 'react-redux';
import { getArticles } from '../../../redux/articles-reducer.js';
import Preloader from '../Preloader/preloader';
import classNames from 'classnames';

const InformationBlocks = (props) => {

    useEffect(() => {
        props.getArticles(1, 5);
    },[]);

    if(!props.articles) {
        return <Preloader />
    }

    return (
        <div>
            <div className={s.containerOuter} id={s.mainContent}>
                <div className={s.containerInner}>
                    <div className={s.colLeft}>

                        <NavLink to="/blog">                            
                                <h3 className={classNames(s.hBlog, s.lineChocolate)}>
                                    <div className={s.titleName}>
                                        BLOG
                                    </div>
                                </h3>                            
                        </NavLink>                            
                        <div className={s.colFixedHeight}>
                            <ul className={s.itemFeed}>
                               <BlogLastArticles articles={props.articles} />
                            </ul>
                        </div>
                    </div>

                    <div className={s.colRight}>
                        <NavLink to="/projects"><h3 className={s.hSpeaking}><div className={s.titleName}>PROJECTS</div></h3></NavLink>
                        <div className={s.colFixedHeight}>
                            <ul className={s.itemFeed}>

                                <li><a href="#">University of California San Diego</a><br /><span>San Diego, Oct 31, 2019</span></li>
                                <li><a href="#">San Diego Mesa College</a><br /><span>San Diego, Nov 1, 2019</span></li>
                                <li><a href="#">Ignite</a><br /><span>Orlando, Nov 4, 2019</span></li>
                                <li><a href="#">Azure DevFest</a><br /><span>Portland, Nov 12, 2019</span></li>
                                <li><a href="#">DevIntersection</a><br /><span>Las Vegas, Nov 19, 2019</span></li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const BlogLastArticles = ({articles}) => {
    return (
        articles.map((article) => {
            return (
                <li key={article.id}>
                    <NavLink to={`/blog/${article.id}`}>
                        #{article.id}: {article.title}
                    </NavLink>
                    <span>
                        <time className={s.blockTime}>{article.dateCreate}</time>
                    </span>
                </li>
            )
        })
    );
}

const mapStateToProps = (state) => ({
    articles: state.blog.articles
});

export default connect(mapStateToProps, {getArticles})(InformationBlocks);