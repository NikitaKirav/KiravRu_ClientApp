/** Absolute imports */
import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

/** Styles */
import classes from './footer.module.less';

const Footer = (props) => {
    return (
        <footer className={classes.footer}>
            <div>
                <ul className={classes.menu_nav}>
                    <li className={classes.menu_item}>
                        <NavLink to="/works" end={true} className={({isActive}) => isActive ? classNames(classes.active,classes.menu_link) : classes.menu_link}>WORKS</NavLink>
                    </li>
                    {/*<li className={classes.menu_item}>
                        <NavLink to="/blog" className={({isActive}) => isActive ? classNames(classes.active,classes.menu_link) : classes.menu_link}>BLOG</NavLink>
                    </li>*/}
                    <li className={classes.menu_item}>
                        <NavLink to="/notes" className={({isActive}) => isActive ? classNames(classes.active,classes.menu_link) : classes.menu_link}>NOTES</NavLink>
                    </li>
                    <li className={classes.menu_item}>
                        <NavLink to="/contacts" className={({isActive}) => isActive ? classNames(classes.active,classes.menu_link) : classes.menu_link}>CONTACTS</NavLink>
                    </li>
                </ul>
                <div className={classes.line}></div>
                <p className={classes.copyright}>Copyright &copy; {new Date().getUTCFullYear()} - KiravRu</p>
            </div>
        </footer>
    );
}

export default Footer;