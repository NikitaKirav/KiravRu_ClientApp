import React from 'react';
import './top-menu-adm.less';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const TopMenuAdm = (props) => {
    return (
        <div className="menu">
            <div className="togglerMenu" onClick={props.onToggleMenu}><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></div>
            <NavLink end to="/"><div className="homeMenu">Home</div></NavLink>
        </div>
    );
}

export default TopMenuAdm;