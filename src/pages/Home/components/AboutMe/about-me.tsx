/** Absolute imports */
import React from 'react';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';

/** Styles */
import s from './about-me.module.less';


const AboutMe = () => {

    const { ref, inView, entry } = useInView({
        threshold: 0,
      });

    return (
        <div className={s.aboutMeBlock} ref={ref}>
            <div className={classNames(s.tree, inView ? s.treeActive : '')}>
                <span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span>
                <div className={s.halfCircle}></div>
                <div className={classNames(s.circle, s.circle1)}></div>
                <div className={classNames(s.circle, s.circle2)}></div>
                <div className={classNames(s.circle, s.circle3)}></div>
                <div className={classNames(s.circle, s.circle4)}></div>
            </div>
            <div className={s.contentAboutMe}>
                <div className={classNames(s.leftColumn, s.verticalAlign)}>
                    <h2 className={s.labelH2}>About Me</h2>
                </div>
                <div className={s.rightColumn}>
                    <p>Hey, there</p>
                    <p>My name's Nikita Kirav. I am a programmer with 10+ years of experience. The beginning of my career was connected with factories, 
                        where I worked as a technical director and was engaged in automating of all processes (from receiving orders to production). 
                        To implement all this, we used all available IT technologies at that time.</p>
                    <p>This experience gave me an understanding of how to organize effective work, quickly search for the right information, 
                        solve problems and do projects following deadlines and real opportunities. </p>
                    <p>Now I am completely dedicated to web development. I constantly study computer science, algorithms, design patterns etc. 
                        for improving my skills and knowledges and I like it.</p>
                </div>
            </div>
            <div className={s.contentAboutMe}>
                <div className={classNames(s.leftColumn, s.verticalAlign)}>
                    <h3 className={s.labelH3}>Skills and expertise</h3>
                </div>
                <div className={s.rightColumn}>
                    <div className={s.mySkills}>
                        <div className={s.skillsRow}>
                            <div className={s.titleSkill}><h4 className={s.labelH4}>Programming Languages:</h4></div>
                            <div className={s.skill}>C#</div> <div className={s.skill}>JavaScript</div> <div className={s.skill}>TypeScript</div> 
                            <div className={s.skill}>HTML5</div> 
                            <div className={s.skill}>CSS3</div> <div className={s.skill}>Sass</div> <div className={s.skill}>Less</div> 
                            <div className={s.skill}>TSQL</div>
                        </div>
                        <div className={s.skillsRow}>
                            <div className={s.titleSkill}><h4 className={s.labelH4}>Front-End Development Skills:</h4></div>
                            <div className={s.skill}>React</div> <div className={s.skill}>Redux</div> <div className={s.skill}>GraphQL</div>  
                            <div className={s.skill}>REST API</div> <div className={s.skill}>ES6</div>
                            <div className={s.skill}>Webpack</div>
                        </div>
                        <div className={s.skillsRow}>
                            <div className={s.titleSkill}><h4 className={s.labelH4}>Back-End Development Skills:</h4></div>
                            <div className={s.skill}>ASP.NET Framework (MVC, WebApi)</div> 
                            <div className={s.skill}>ASP.NET Core (MVC, WebApi)</div> <div className={s.skill}>Entity Framework</div> 
                            <div className={s.skill}>EF Core</div> <div className={s.skill}>Node js</div> <div className={s.skill}>Wordpress</div>
                            <div className={s.skill}>OpenCart</div> <div className={s.skill}>Amazon Web Services</div>
                        </div>
                        <div className={s.skillsRow}>
                            <div className={s.titleSkill}><h4 className={s.labelH4}>Desktop Software Development Skills:</h4></div>
                            <div className={s.skill}>Windows Form</div> <div className={s.skill}>WPF</div>
                        </div>                        
                        <div className={s.skillsRow}>
                            <div className={s.titleSkill}><h4 className={s.labelH4}>Databases:</h4></div>
                            <div className={s.skill}>MSSQL</div> <div className={s.skill}>PostgreSQL</div> <div className={s.skill}>MySQL</div>
                            <div className={s.skill}>MongoDb</div>
                        </div>                        
                        <div className={s.skillsRow}>
                            <div className={s.titleSkill}><h4 className={s.labelH4}>Web Servers:</h4></div>
                            <div className={s.skill}>Microsoft IIS</div> <div className={s.skill}>Apache</div><div className={s.skill}>NGINX</div>
                        </div>
                        <div className={s.skillsRow}>
                            <div className={s.titleSkill}><h4 className={s.labelH4}>{`DevOps Automation & Other Tools:`}</h4></div>
                            <div className={s.skill}>Git</div> <div className={s.skill}>Docker</div> <div className={s.skill}>Jenkins</div> <div className={s.skill}>Deployment Automation Jobs</div>
                        </div>   
                        <div className={s.skillsRow}>
                            <div className={s.titleSkill}><h4 className={s.labelH4}>{`2D,3D Modeling Software:`}</h4></div>
                            <div className={s.skill}>Photoshop</div> <div className={s.skill}>CorelDraw</div> <div className={s.skill}>3d Max</div>
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;