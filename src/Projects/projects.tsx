import React from 'react';
import { Description } from '../components/Description/description';
import ElementProjects from './element-projects';
import classes from './projects.module.less';
import artCanvasImage from '../../assets/images/artCanvas.jpg';
import fileBroImage  from '../../assets/images/fileBro.jpg';
import messengerImage  from '../../assets/images/messenger.jpg';
import letsdrinkImage  from '../../assets/images/letsdrink.jpg';
import izmailovoImage  from '../../assets/images/izmailovo.jpg';

const Projects = () => {
    return (
        <>
        {/*<Description />*/}        
        <div className={classes.projects}>
            <h1>Works</h1>
            <div className={classes.description}>This is the place where you can see my projects and experiments in different IT areas. 
                From time to time I upload the most interesting ones. So, stay tuned....</div>
            <div className={classes.borderLineFat}></div>    
            <ElementProjects to='/works/artcanvas' reloadDocument={false} name='ArtCanvas' date='OCTOBER 23, 2020' imagePath={artCanvasImage}
                            info={ArtCanvas} />
            <div className={classes.borderLine}></div>                
            <ElementProjects to='/works/izmailovo' reloadDocument={false} name="Hotel client-server application" date='NOVEMBER 20, 2019' imagePath={izmailovoImage}
                            info={Izmailovo} />
            <div className={classes.borderLine}></div>
            <ElementProjects to='/works/messenger' reloadDocument={true} name='Messenger' date='OCTOBER 20, 2020' imagePath={messengerImage}
                            info={Messenger} />
            <div className={classes.borderLine}></div>
            <ElementProjects to='/works/filebro' reloadDocument={false} name='FileBro' date='OCTOBER 19, 2020' imagePath={fileBroImage}
                            info={FileBro} />
            <div className={classes.borderLine}></div>
            <ElementProjects to='/works/letsdrink' reloadDocument={false} name="Let's drink" date='NOVEMBER 20, 2019' imagePath={letsdrinkImage}
                            info={Letsdrink} />
        </div>
        </>
    );
}

const ArtCanvas = {
    description: () => {
    return (
        <>
        <p>This is an experiment with Canvas(HTML5).</p>
        </>);
    },
    myRole: () => {
        return (
            <>
                <p>The project consists of two parts. First part is an area for drawing. Here you can draw your painting and after saving it, 
            the programme puts your picture to the second part.
            The second part is a common canvas where are stored other paintings of other people. So you add your little piece to common one.</p>
            </>
        );
    },
    projectDifficulties: () => {
        return '';
    },
    mySolution: () => {
        return '';
    },
    notableFeatures: () => {
        return (
            <>
            <ul>
                <li>Drawing an image</li>
                <li>Saving an image on the server</li>
                <li>Image optimization</li>
                <li>Combining images into a big picture</li>
            </ul>
            </>
        );
    },
    technologiesUsed: () => {
        return (
            <>
            <ul>
                <li>Javascript</li>
                <li>HTML5</li>
                <li>CSS3</li>
            </ul>
            </>
        );
    }
}

const Messenger = {
    description: () => {
    return (
        <>
        <p>This is an example of a social network (messenger).</p>
        </>);
    },
    myRole: () => {
        return (
            <>
                <p>This is an experiment with developing of a social network. This project is not completed and is being developed further.
                I made the basis of the project: user profile, posts list, user's list, chat and etc. 
                In the near future, it will be added: end-to-end data encryption, audio and video chat, and much more.
                </p>
            </>
        );
    },
    projectDifficulties: () => {
        return (
            <>
                <p>This is a big learning project with a lot of complex stuff. 
                    I take ideas from modern messengers and social networks and try to repeat the result as fully as possible.
                </p>
            </>
        );
    },
    mySolution: () => {
        return '';
    },
    notableFeatures: () => {
        return (
            <>
            <ul>
                <li>Registration / Login</li>
                <li>Token Authentification</li>
                <li>Chat, Profile, Posts</li>
            </ul>
            </>
        );
    },
    technologiesUsed: () => {
        return (
            <>
            <ul>
                <li>ReactJS + Redux</li>
                <li>TypeScript</li>
                <li>Less</li>
                <li>NodeJS</li>
                <li>Websockets</li>
                <li>MongoDb</li>
                <li>Ant design</li>
                <li>GitHub + Jenkins</li>
            </ul>
            </>
        );
    }
}

const FileBro = {
    description: () => {
        return (
            <>
            <p>This is a file manager for working with CKEditor and ASP.NET Core.</p>
            </>
        );
    },
    myRole: () => {
        return (
            <>
                <p>When you use the CKEditor with ASP.NET Core you might have seen that the file manager CKFinder doesn't work. 
                I'd like to present my FileBrowser! I do like CKEditor and I didn't want to change it to another one. 
                For my 'FileBrowser' I have made the simplified version of the CKFinder. It's much easier but its main functions are still available.</p>
            </>
        );
    },
    projectDifficulties: () => {
        return (
            <>
                <p>Link my file browser to CKEditor. Make the main functionality of the file manager: add, copy, move, rename, delete a file and folder.</p>
            </>
        );
    },
    mySolution: () => {
        return '';
    },
    notableFeatures: () => {
        return (
            <>
            <ul>
                <li>Link my file browser to CKEditor</li>
                <li>Complete list of required file browser commands</li>
            </ul>
            </>
        );
    },
    technologiesUsed: () => {
        return (
            <>
            <ul>
                <li>Javascript</li>
                <li>ES6</li>
                <li>ASP.NET Core</li>
                <li>CSS3</li>
                <li>CKEditor</li>
                <li>Opensource</li>
            </ul>
            </>
        );
    }
}

const Letsdrink = {
    description: () => {
        return (
            <>
            <p>This is an online shop. This project was based on CMS OpenCart, nevertheless it was a very big project with different sections and domains.</p>
            </>
        );
    },
    myRole: () => {
        return (
            <>
                <p>I've created a design of this site, logotype and all necessary graphic productions. Later, I built the sites (online shop and forum).</p>
            </>
        );
    },
    projectDifficulties: () => {
        return (
            <>
                <p>The main site "Let's drink" had more than 15.000 positions of goods. It was integrated with different providers and their websites.
                Every three hours such data as goods' availability and their prices were automatically updated.</p>
            </>
        );
    },
    mySolution: () => {
        return "";
    },
    notableFeatures: () => {
        return (
            <>
            <ul>
                <li>Registration and Login</li>
                <li>Payment by credit card (Visa, MasterCard)</li>
                <li>Account confirmation</li>
                <li>SEO optimization</li>
                <li>The system of selecting the company for the delivery of goods</li>
                <li>Determining the weight of the parcel and the cost of delivery</li>
            </ul>
            </>
        );
    },
    technologiesUsed: () => {
        return (
            <>
            <ul>
                <li>OpenCart</li>
                <li>PHP</li>
                <li>Javascript</li>
                <li>CSS3</li>
                <li>MySQL</li>
            </ul>
            </>
        );
    }
}

const Izmailovo = {
    description: () => {
        return (
            <>        
            <p>This application was created for the biggest hotel of Russia. 
                It was a Fault-Tolerant Composite Project that had a strong isolation between the host and plug-ins.</p>
            </>
        );
    },
    myRole: () => {
        return (
            <>
                <p>The main task was to create an application which would be installed on each computer of the hotel 
                    and each employee could only use their own modules. I need to develop some modules like 'Shareholder Register', 'Mainds', 'Administration'. 
                    The application must be a Windows Desktop App.</p>
            </>
        );
    },
    projectDifficulties: () => {
        return (
            <>
                <p>If users doesn't have an access to some modules then they don't see them. The application must support different versions of Windows (Windows XP, 7, 10) 
                and different screen sizes. Using existing databases (MSSQL) on different servers. One-time update of the application on all computers.
                </p>
            </>
        );
    },
    mySolution: () => {
        return (
            <>
                <p>For build Fault-Tolerant Composite Applications I use a solution of Ivan Krivyakov 
                    (<a target="_blank"  href="https://docs.microsoft.com/en-us/archive/msdn-magazine/2014/january/wpf-build-fault-tolerant-composite-applications">docs.microsoft.com/...</a>).
                    I made the app in two parts: server-side (ASP.NET Web API Framework) and client-side (WPF).
                </p>
            </>
        );
    },
    notableFeatures: () => {
        return (
            <>
            <ul>
                <li>The system of authorization and identification of users</li>
                <li>Opportunity to easy development of new plug-ins in the future</li>
                <li>Automatically update the application on user's computers after deployment on the server</li>
                <li>Virtualizing data</li>
            </ul>
            </>
        );
    },
    technologiesUsed: () => {
        return (
            <>
            <ul>
                <li>WPF MVVM</li>
                <li>ASP.NET WebApi</li>
                <li>MS SQL</li>
                <li>TFS Git</li>
                <li>IIS</li>
            </ul>
            </>
        );
    }
}

export default Projects;