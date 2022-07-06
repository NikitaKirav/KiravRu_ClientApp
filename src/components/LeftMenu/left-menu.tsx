/** Absolute imports */
import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

/** Components */
import { MenuBurger } from './components/MenuBurger/menu-burger';
import { LeftMenuSocialMedia } from './components/LeftMenuSocialMedia/left-menu-social-media';

/** Styles */
import classes from './left-menu.module.less';

/** Store */
import { logout } from '../../redux/auth-main-reducer';

/** SVG */
import { IconUserLoggedIn, IconUserLoggedOut } from '../../svg-icons/user-login';


interface LeftMenuProps {
    navToggle: boolean;
    onClickNavToggle: () => void;
    isAuth: boolean;
    logout: () => void;
}

const LeftMenuComponent: React.FC<LeftMenuProps> = ({navToggle, onClickNavToggle, isAuth, logout}) => {

    const onClickLogout = () => {
        logout();
        onClickNavToggle();
    }

    return (
        <>
		<nav className={classNames(classes.nav, navToggle ? classes.active : '')}>
			<ul>
				<li><NavLink to="/works" className={({isActive}) => isActive && classNames(classes.activeLink)} onClick={onClickNavToggle}>WORKS</NavLink></li>
				{/*<li><NavLink to="/blog" className={({isActive}) => isActive && classNames(classes.activeLink)} onClick={onClickNavToggle}>BLOG</NavLink></li>*/}
				<li><NavLink to="/notes" className={({isActive}) => isActive && classNames(classes.activeLink)} onClick={onClickNavToggle}>NOTES</NavLink></li>
				<li><NavLink to="/contacts" className={({isActive}) => isActive && classNames(classes.activeLink)} onClick={onClickNavToggle}>CONTACTS</NavLink></li>
                <li>{!isAuth 
                ? <NavLink to="/login" onClick={onClickNavToggle}>
                    <IconUserLoggedOut />                
                </NavLink> 
                : <IconUserLoggedIn />}
                </li>
                {isAuth && <>
                    <li><NavLink to="/adminBoard" onClick={onClickNavToggle}>ADMIN BOARD</NavLink></li>
                    <li><a className={classes.logout} onClick={onClickLogout}>LOGOUT</a></li>
                </>}
			</ul>
            <div className={classes.socialMedia}>
                <span>SOCIAL MEDIA</span>
                <div className={classes.socialMediaLogos}>
                    <a href='https://github.com/NikitaKirav'>
                        <div className={classNames(classes.githab, classes.logo)} data-title="GITHAB"></div>
                    </a>
                    <a href='http://www.linkedin.com/in/nikita-kirav'>
                        <div className={classNames(classes.linkedin, classes.logo)} data-title="LINKEDIN"></div>
                    </a>
                </div>
                <div className={classes.rights}>© 2022 - Kirav.ru</div>
            </div>
		</nav>
        <MenuBurger navToggle={navToggle} onClickNavToggle={onClickNavToggle} />
        <LeftMenuSocialMedia hide={navToggle} />
        </>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.authMain.isAuth
}); 

export default connect(mapStateToProps, {logout})(LeftMenuComponent);