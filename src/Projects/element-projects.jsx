import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './element-projects.module.less';

const ElementProjects = (props) => {
    return (
        <article className={s.project}>
            <div className={s.columnleft}>
                <NavLink to={props.to} ><img src={props.imagePath} className={s.projectImage} title={props.name} width="300px"/></NavLink>
            </div>
            <div className={s.columnright}>
                <table className={s.tableArticle}>
                    <tbody>
                        <tr>
                            <td className={s.titleArticle}>
                                <h2>
                                    <NavLink to={props.to} >
                                        <div className={s.title}>{props.name}</div>
                                    </NavLink>
                                </h2>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <time className={s.blockTime}>{props.date}</time>
                <div className={s.articleText}>
                    {props.description}
                </div>
            </div>
        </article>
    );
}

export default ElementProjects;