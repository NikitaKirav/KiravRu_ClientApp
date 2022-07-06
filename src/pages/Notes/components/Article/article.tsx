/** Absolute imports */
import React, { Component } from 'react';
import Difficulty from '../../../../components/Difficulty/difficulty';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import hljs from "highlight.js";
import classNames from 'classnames';

/** Styles */
import classes from './article.module.less';
import '../../../../../assets/style/vs.css';

/** Types */
import { ArticleType } from '../../../../types/types';


type PropsType = {
    article: ArticleType 
}

const Article: React.FC<PropsType> = (props) => {
    return <div className={classes.article}>
        <div className={classes.pageWrap}>
            <section className={classNames(classes.homeArticle, classes.singleArticle)}>
                <article>
                    <div><NavLink to="/notes">Notes</NavLink> / {props.article.name}</div>
                    <div className={classes.borderLineFat}></div>
                    <table className={classes.tableArticle}>
                        <tbody>
                        <tr>
                            <td className={classes.titleArticle}>
                                <h1>
                                    #{props.article.id}: {props.article.name}
                                </h1>
                            </td>
                            <td className={classes.difficulty}>
                                <Difficulty difficultyLevel={props.article.difficultyLevel} />
                            </td>
                        </tr> 
                        </tbody>                       
                    </table>

                    <time className={classes.blockTime}>
                        {props.article.dateCreate} {props.article.dateCreate===props.article.dateChange ? "" : <span> (Change: {props.article.dateChange})</span>}
                    </time>
                    <CreateText text={props.article.text } />
                </article>
            </section>
        </div>
    </div>
}

type CreateTextPropsType = {
    text: string
}

class CreateText extends Component<CreateTextPropsType> {
    componentDidMount() {
      this.updateCodeSyntaxHighlighting();
    }
  
    componentDidUpdate() {
      this.updateCodeSyntaxHighlighting();
    }

    componentWillUnmount() {

    }
  
    updateCodeSyntaxHighlighting = () => {
      document.querySelectorAll("pre code").forEach((block: HTMLElement) => {
        hljs.highlightBlock(block);
      });
    };
  
    render() {
        return <div className={classes.articleText} dangerouslySetInnerHTML={{__html: this.props.text}} />; 
    }
  }


export default Article;