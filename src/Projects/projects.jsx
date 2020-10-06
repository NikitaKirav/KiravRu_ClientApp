import React from 'react';
import { NavLink } from 'react-router-dom';
import { Description } from '../components/Description/description.jsx';
import './projects.less';

const Projects = (props) => {
    return (
        <>
        <Description />
        <div className="projects">
            <div className="project">
                <div className="pageWrap">
                    <NavLink to='/projects/artcanvas'>ArtCanvas</NavLink>
                </div>
            </div>
            <div className="project">
                <div className="pageWrap">
                    <NavLink to='/projects/messenger'>Messenger</NavLink>
                </div>
            </div>
            <div className="project">
                <div className="pageWrap">
                    FileBro
                </div>
            </div>
        </div>
        </>
    );
}

export default Projects;