/** Absolute imports */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

/** Styles */
import classes from './my-photo-with-logo.module.less';

export const MyPhotoWithLogo = () => {

    const [isOnLeftPartOfScreen, setIsOnLeftPartOfScreen] = useState(false);

    const handleMouseMove = (ev) => {
        if (window.innerWidth/2 > ev.pageX) 
            setIsOnLeftPartOfScreen(false); 
        else
            setIsOnLeftPartOfScreen(true); 
    }
    
    return (
        <div className={classes.conteiner} onMouseMove={(ev)=> handleMouseMove(ev)}>
            <div className={classNames(classes.logoNikita, isOnLeftPartOfScreen ? classes.left : classes.right)}></div>
            <div className={classNames(classes.logoAboutFrontend, isOnLeftPartOfScreen ? classes.left : classes.right)}>Frontend &nbsp; {'&'}</div>            
            <div className={classes.myPhoto1}></div>   
            <h1 className={classes.titleIamNikita}>Hi, I'm Nikita</h1>          
            <div className={classNames(classes.myPhoto2, isOnLeftPartOfScreen ? classes.show : classes.hide)}></div>
            <div className={classNames(classes.logoKirav, isOnLeftPartOfScreen ? classes.left : classes.right)}></div>
            <div className={classNames(classes.logoAboutBackend, isOnLeftPartOfScreen ? classes.left : classes.right)}>Backend Developer</div>    
            <div className={classNames(classes.logo, isOnLeftPartOfScreen ? classes.left : classes.right)}></div>
            <div className={classNames(classes.logoAbout, isOnLeftPartOfScreen ? classes.left : classes.right)}>Frontend &nbsp; {'&'}<br/>Backend Developer</div>
            <Link to={"/?aboutme"}><div className={classNames(classes.logoReadMore, isOnLeftPartOfScreen ? classes.left : classes.right)}>READ MORE &#10141;</div></Link>
        </div>
    );
}