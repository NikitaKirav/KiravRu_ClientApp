/** Absolute imports */
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

/** Components */
import Preloader from '../Preloader/preloader';

/** Styles */
import s from './information-blocks.module.less';

/** Store */
import { getArticles } from '../../../redux/articles-reducer';

/** Images */
import artCanvasImage from '../../../../assets/images/artCanvas-mini.jpg';
import fileBroImage  from '../../../../assets/images/fileBro-mini.jpg';
import messengerImage  from '../../../../assets/images/messenger-mini.jpg';
import letsdrinkImage  from '../../../../assets/images/letsdrink-mini.jpg';
import izmailovoImage  from '../../../../assets/images/izmailovo-mini.jpg';

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

                        <NavLink to="/notes">                            
                                <h3 className={classNames(s.hBlog, s.lineChocolate)}>
                                    <div className={s.titleName}>
                                        NOTES
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
                        <NavLink to="/works"><h3 className={s.hSpeaking}><div className={s.titleName}>WORKS</div></h3></NavLink>
                        <div className={s.colFixedHeight}>
                            <ul className={s.itemFeed}>
                                <Projects imageSrc={artCanvasImage} title={"ArtCanvas"} href={"/works/artcanvas"} date={"OCTOBER 23, 2020"} />
                                <Projects imageSrc={izmailovoImage} title={"Izmailovo client-server application"} href={"/works/izmailovo"} date={"NOVEMBER 20, 2019"} />
                                <Projects imageSrc={fileBroImage} title={"FileBro"} href={"/works/filebro"} date={"OCTOBER 19, 2020"} />
                                <Projects imageSrc={letsdrinkImage} title={"Let's drink"} href={"/works/letsdrink"} date={"NOVEMBER 20, 2019"} />
                                <Projects imageSrc={messengerImage} title={"Messenger"} href={"/works/messenger"} date={"OCTOBER 20, 2020"} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Projects = ({imageSrc, title, href, date}) => {
    return (
        <>
            <li>
                <div>
                    <NavLink to={href}>{title}</NavLink>
                    <br /><span><time className={s.blockTime}>{date}</time></span>
                </div>
            </li>
        </>
    );
}

const BlogLastArticles = ({articles}) => {
    return (
        articles.map((article) => {
            return (
                <li key={article.id}>
                    <NavLink to={`/notes/${article.id}`}>
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