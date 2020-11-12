import React from 'react';
import s from './about-me.module.less';
import myPhoto from '../../../assets/images/myPhoto.jpg';
import { Element } from "react-scroll";
import classnames from 'classnames';

const AboutMe = (props) => {
    return (
        <div className={s.aboutMeBlock}>
            <div className={s.contentAboutMe}>
                <div className={classnames(s.leftColumn, s.verticalAlign)}>
                    <h2 className={s.labelH2}>About Me</h2>
                    {/*<img className="myPhoto" src={myPhoto} width="190px" />*/}
                </div>
                <div className={s.rightColumn}>
                    <p>Hey, there</p>
                    <p>My name's Nikita Kirav. I live in Moscow, Russia. I'm a programmer focused on graphics, interaction for web experiences. 
                    Also, I like learning new in DevOps and web security areas.</p>
                    <p>I've been working in diferent projects since around 2006. I'm experienced in developing various systems across diversified domains 
                    and technologies including e-commerce, tourism and industrial applications.</p>
                    <p>I'm always on the lookout for interesting projects, so feel free to get in touch if you think I'd be good fit for yours.</p>
                </div>
            </div>
            <div className={s.contentAboutMe}>
                <div className={classnames(s.leftColumn, s.verticalAlign)}>
                    <h3 className={s.labelH3}>Skills and expertise</h3>
                </div>
                <div className={s.rightColumn}>
                    <div className={s.mySkills}>
                        <div className={s.skillsRow}>
                            <div className={s.titleSkill}><h4 className={s.labelH4}>Programming Languages:</h4></div>
                            <div className={s.skill}>C#</div> <div className={s.skill}>JavaScript</div> <div className={s.skill}>HTML5</div> 
                            <div className={s.skill}>CSS3</div> <div className={s.skill}>Sass</div> <div className={s.skill}>Less</div> 
                            <div className={s.skill}>TSQL</div>
                        </div>
                        <div className={s.skillsRow}>
                            <div className={s.titleSkill}><h4 className={s.labelH4}>Front-End Development Skills:</h4></div>
                            <div className={s.skill}>React</div> <div className={s.skill}>Redux</div> <div className={s.skill}>ES6</div>
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
                        </div>                        
                        <div className={s.skillsRow}>
                            <div className={s.titleSkill}><h4 className={s.labelH4}>Web Servers:</h4></div>
                            <div className={s.skill}>Microsoft IIS</div> <div className={s.skill}>Apache</div>
                        </div>
                        <div className={s.skillsRow}>
                            <div className={s.titleSkill}><h4 className={s.labelH4}>{`DevOps Automation & Version Control Tools:`}</h4></div>
                            <div className={s.skill}>Git</div> <div className={s.skill}>Jenkins</div> <div className={s.skill}>Deployment Automation Jobs</div>
                        </div>   
                        <div className={s.skillsRow}>
                            <div className={s.titleSkill}><h4 className={s.labelH4}>{`2D,3D Modeling Software:`}</h4></div>
                            <div className={s.skill}>Photoshop</div> <div className={s.skill}>CorelDraw</div> <div className={s.skill}>3d Max</div>
                        </div>                      
                    </div>
                </div>
            </div>
            <Element name="textme" className={s.element}>
            <div className={s.contentAboutMe}>
                <div className={classnames(s.leftColumn, s.verticalAlign)}>
                    <h3 className={classnames(s.labelH3, s.string)}>Contact with me</h3>
                </div>
                <div className={s.rightColumn}>
                    <form>
                        <input type="text" className={s.email} id="lname" name="lastname" placeholder="Your email.." />
                        <textarea className={s.message} id="subject" name="subject" placeholder="Write something.."></textarea>
                        <input className={s.submitButton} type="submit" value="Submit" />
                    </form>
                </div>
            </div>
            </Element>
        </div>
    );
}

export default AboutMe;