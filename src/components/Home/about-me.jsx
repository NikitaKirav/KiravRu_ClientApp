import React from 'react';
import './about-me.less';
import myPhoto from '../../../assets/images/myPhoto.jpg';
import { Element } from "react-scroll";

const AboutMe = (props) => {
    return (
        <div className="aboutMeBlock">
            <div className="contentAboutMe">
                <div className="leftColumn verticalAlign">
                    <h2 className="labelH2">About Me</h2>
                    {/*<img className="myPhoto" src={myPhoto} width="190px" />*/}
                </div>
                <div className="rightColumn">
                    <p>Hey, there</p>
                    <p>My name's Nikita Kirav. I live in Moscow, Russia. I'm a programmer focused on graphics, interaction for web experiences. 
                    Also, I like learning new in DevOps and web security areas.</p>
                    <p>I've been working in diferent projects since around 2006. I'm experienced in developing various systems across diversified domains 
                    and technologies including e-commerce, tourism and industrial applications.</p>
                    <p>I'm always on the lookout for interesting projects, so feel free to get in touch if you think I'd be good fit for yours.</p>
                </div>
            </div>
            <div className="contentAboutMe">
                <div className="leftColumn verticalAlign">
                    <h3 className="labelH3">Skills and expertise</h3>
                </div>
                <div className="rightColumn">
                    <div className="mySkills">
                        <div className="skillsRow">
                            <div className="titleSkill"><h4 className="labelH4">Programming Languages:</h4></div>
                            <div className="skill">C#</div> <div className="skill">JavaScript</div> <div className="skill">HTML5</div> 
                            <div className="skill">CSS3</div> <div className="skill">Sass</div> <div className="skill">Less</div> 
                            <div className="skill">TSQL</div>
                        </div>
                        <div className="skillsRow">
                            <div className="titleSkill"><h4 className="labelH4">Front-End Development Skills:</h4></div>
                            <div className="skill">React</div> <div className="skill">Redux</div> <div className="skill">ES6</div>
                            <div className="skill">Webpack</div>
                        </div>
                        <div className="skillsRow">
                            <div className="titleSkill"><h4 className="labelH4">Back-End Development Skills:</h4></div>
                            <div className="skill">ASP.NET Framework (MVC, WebApi)</div> 
                            <div className="skill">ASP.NET Core (MVC, WebApi)</div> <div className="skill">Entity Framework</div> 
                            <div className="skill">EF Core</div> <div className="skill">Node js</div> <div className="skill">Wordpress</div>
                            <div className="skill">OpenCart</div> <div className="skill">Amazon Web Services</div>
                        </div>
                        <div className="skillsRow">
                            <div className="titleSkill"><h4 className="labelH4">Desktop Software Development Skills:</h4></div>
                            <div className="skill">Windows Form</div> <div className="skill">WPF</div>
                        </div>                        
                        <div className="skillsRow">
                            <div className="titleSkill"><h4 className="labelH4">Databases:</h4></div>
                            <div className="skill">MSSQL</div> <div className="skill">PostgreSQL</div> <div className="skill">MySQL</div>
                        </div>                        
                        <div className="skillsRow">
                            <div className="titleSkill"><h4 className="labelH4">Web Servers:</h4></div>
                            <div className="skill">Microsoft IIS</div> <div className="skill">Apache</div>
                        </div>
                        <div className="skillsRow">
                            <div className="titleSkill"><h4 className="labelH4">{`DevOps Automation & Version Control Tools:`}</h4></div>
                            <div className="skill">Git</div> <div className="skill">Jenkins</div> <div className="skill">Deployment Automation Jobs</div>
                        </div>   
                        <div className="skillsRow">
                            <div className="titleSkill"><h4 className="labelH4">{`2D,3D Modeling Software:`}</h4></div>
                            <div className="skill">Photoshop</div> <div className="skill">CorelDraw</div> <div className="skill">3d Max</div>
                        </div>                      
                    </div>
                </div>
            </div>
            <Element name="textme" className="element">
            <div className="contentAboutMe">
                <div className="leftColumn verticalAlign">
                    <h3 className="labelH3 string">Contact with me</h3>
                </div>
                <div className="rightColumn">
                    <form>
                        <input type="text" id="lname" name="lastname" placeholder="Your email.." />
                        <textarea className="message" id="subject" name="subject" placeholder="Write something.."></textarea>
                        <input className="submitButton" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
            </Element>
        </div>
    );
}

export default AboutMe;