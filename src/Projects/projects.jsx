import React from 'react';
import { NavLink } from 'react-router-dom';
import { Description } from '../components/Description/description.jsx';
import ElementProjects from './element-projects.jsx';
import './projects.less';
import artCanvasImage from '../../assets/images/artCanvas.jpg';
import fileBroImage from '../../assets/images/fileBro.jpg';
import messengerImage from '../../assets/images/messenger.jpg';
import letsdrinkImage from '../../assets/images/letsdrink.jpg';
import izmailovoImage from '../../assets/images/izmailovo.jpg';

const Projects = (props) => {
    return (
        <>
        <div className="space"></div>
        <Description />
        <div className="projects">
            <ElementProjects to='/projects/artcanvas' name='ArtCanvas' date='OCTOBER 23, 2020' imagePath={artCanvasImage}
                            description={ArtCanvas_Description()} />
            <div className="borderLine"></div>                
            <ElementProjects to='/projects/izmailovo' name="Izmailovo client-server application" date='NOVEMBER 20, 2019' imagePath={izmailovoImage}
                            description={Izmailovo_Description()} />
            {/*<div className="borderLine"></div>
            <ElementProjects to='/projects/messenger' name='Messenger' date='OCTOBER 20, 2020' imagePath={messengerImage}
                description='This is an experiment with a canvas.' />*/}
            <div className="borderLine"></div>
            <ElementProjects to='/projects/filebro' name='FileBro' date='OCTOBER 19, 2020' imagePath={fileBroImage}
                            description={FileBro_Description()} />
            <div className="borderLine"></div>
            <ElementProjects to='/projects/letsdrink' name="Let's drink" date='NOVEMBER 20, 2019' imagePath={letsdrinkImage}
                            description={Letsdrink_Description()} />
        </div>
        </>
    );
}

const ArtCanvas_Description = (props) => {
    return (
        <>
        <p>This is an experiment with Canvas(HTML5). The project consists of two parts.</p>
        <p> First part is an area for drawing. Here you can draw your painting and after saving it, 
            the programme puts your picture to the second part.</p>
        <p>The second part is a common canvas where are stored other paintings of other people. So you add your little piece to common one.</p>
        </>
    );
}

const FileBro_Description = (props) => {
    return (
        <>
        <p>This is a file manager. When you use the CKEditor with ASP.NET Core you might have seen that the file manager CKFinder doesn't work.</p> 
        <p>I'd like to present my FileBrowser! I do like CKEditor and I didn't want to change it to another one. 
        For my 'FileBrowser' I have made the simplified version of the CKFinder. It's much easier but its main functions are still available.</p>
        </>
    );
}

const Letsdrink_Description = (props) => {
    return (
        <>
        <p>This project was based on CMS WordPress, nevertheless it was a very big project with different sections and domains.</p>
        <p>The main site "Let's drink" had more than 15.000 positions of goods. It was integrated with different providers and their websites.
        Every three hours such data as goods' availability and their prices were automatically updated.</p>
        </>
    );
}

const Izmailovo_Description = (props) => {
    return (
        <>        
        <p>It was quite a difficult project. The App used the following technologies: server part (ASP.NET WebApi), client (WPF MVVM), 
            database (MS SQL) and git (TFS Git). It was a Fault-Tolerant Composite Project that had a strong isolation between the host and plug-ins.</p>
        <p>The App had different plug-ins such as Administration (gives Users different access to the application), shareholder register 
            (controls payments to shareholders), minds (distributes shifts for maids) and etc.</p>
        </>
    );
}

export default Projects;