/** Absolute imports */
import React from 'react';
import { NavLink } from 'react-router-dom';

/** Styles */
import s from './element-projects.module.less';

type Description = {
    description: () => string | JSX.Element
    myRole: () => string | JSX.Element
    projectDifficulties: () => string | JSX.Element
    mySolution: () => string | JSX.Element
    notableFeatures: () => string | JSX.Element
    technologiesUsed: () => string | JSX.Element
}

type OwnProps = {
    to: string 
    name: string 
    date: string 
    imagePath: { jpg: string, webp: string }
    info: Description
    reloadDocument: boolean
}

const ElementProjects: React.FC<OwnProps> = (props) => {
    return (
        <article className={s.project}>
            <div className={s.columnleft}>

                <table className={s.tableArticle2}>
                    <tbody>
                        <tr>
                            <td className={s.titleArticle2}>
                                <h2>
                                    <NavLink to={props.to} reloadDocument={props.reloadDocument} >
                                        <div className={s.title2}>{props.name}</div>
                                    </NavLink>
                                </h2>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <NavLink to={props.to} reloadDocument={props.reloadDocument} >
                    <picture>
                        <source srcSet={props.imagePath.webp} type="image/webp" />
                        <source srcSet={props.imagePath.jpg} type="image/jpg" />
                        <img src={props.imagePath.jpg} className={s.projectImage} title={props.name} width="300px"/>
                    </picture>
                </NavLink>
                {/*<div className={s.links}>
                    <div className={s.preview}><PlaySquareOutlined /><span className={s.linkText}>Live Preview</span></div>
                    <div className={s.source}><GithubOutlined /><span className={s.linkText}>Source Private</span></div>
                </div>*/}
                <div className={s.shortInfo}>{props.info.description()}</div>
                <div className={s.technologies}><span className={s.title}>Technologies Used</span>
                    <div className={s.technologiesColons}>
                        {props.info.technologiesUsed()}
                    </div>
                </div>
            </div>
            <div className={s.columnright}>
                <table className={s.tableArticle}>
                    <tbody>
                        <tr>
                            <td className={s.titleArticle}>
                                <h2>
                                    <NavLink to={props.to} reloadDocument={props.reloadDocument} >
                                        <div className={s.title}>{props.name}</div>
                                    </NavLink>
                                </h2>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <time className={s.blockTime}>{props.date}</time>       
                {props.info.myRole() !== '' &&        
                    <div className={s.myRole}>
                        <span className={s.title}>My Role</span>
                        <div className={s.text}>{props.info.myRole()}</div>
                    </div>
                }
                {props.info.projectDifficulties() !== '' &&   
                    <div className={s.projectDifficulties}>
                        <span className={s.title}>Project Difficulties</span>
                        <div className={s.text}>{props.info.projectDifficulties()}</div>
                    </div>
                }
                {props.info.mySolution() !== '' &&   
                    <div className={s.mySolution}>
                        <span className={s.title}>My Solution</span>
                        <div className={s.text}>{props.info.mySolution()}</div>
                    </div>
                }
                {props.info.notableFeatures() !== '' &&   
                    <div className={s.notableFeatures}>
                        <span className={s.title}>Notable Features</span>
                        <div className={s.content}>
                            {props.info.notableFeatures()}
                        </div>
                    </div>
                }
            </div>
        </article>
    );
}

export default ElementProjects;
