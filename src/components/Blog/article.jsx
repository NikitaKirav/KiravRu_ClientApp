import React, { Component } from 'react';
import Difficulty from './difficulty.jsx';
import { NavLink } from 'react-router-dom';
import hljs from "highlight.js";
import '../../../assets/style/vs.css';
import Preloader from '../common/Preloader/preloader.js';

import './article.less';


let Article = (props) => {
    return <div className="article">
        <div className="page-wrap">
            <section className="home-article single-article">
                <article>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/blog">Blog</NavLink></li>
                            <li className="breadcrumb-item active" aria-current="page">{props.article.name}</li>
                        </ol>
                    </nav>

                    <table className="table-article">
                        <tbody>
                        <tr>
                            <td className="title-article">
                                <h1>
                                    #{props.article.id}: {props.article.name}
                                </h1>
                            </td>
                            <td className="difficulty">
                                <Difficulty difficultyLevel={props.article.difficultyLevel} />
                            </td>
                        </tr> 
                        </tbody>                       
                    </table>

                    <time className="block-time">
                        {props.article.dateCreate}
                    </time>
                    <CreateText text={props.article.text } />
                </article>
            </section>
        </div>
    </div>
}

class CreateText extends Component {
    componentDidMount() {
      this.updateCodeSyntaxHighlighting();
    }
  
    componentDidUpdate() {
      this.updateCodeSyntaxHighlighting();
    }

    componentWillUnmount() {

    }
  
    updateCodeSyntaxHighlighting = () => {
      document.querySelectorAll("pre code").forEach(block => {
        hljs.highlightBlock(block);
      });
    };
  
    render() {
        return <div className="article-text" dangerouslySetInnerHTML={{__html: this.props.text}} />; 
    }
  }


export default Article;