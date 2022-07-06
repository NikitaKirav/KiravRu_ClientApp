/** Absolute imports */
import React, { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

/** Hooks */
import useClickOutside from '../../../../packages/ui/hooks/clickoutside';

/** SVG */
import { IconUserLoggedOut, IconUserLoggedIn } from '../../../../svg-icons/user-login';

/** Styles */
import classes from './logged.module.less';

/** Store */
import { logout } from '../../../../redux/auth-main-reducer';


const LoggedComponent = (props) => {

    let [show, setShow] = useState(false);
    let $block = useRef(null);
    let $icon = useRef(null);
    const handleClickOutside = useCallback((event) => {
        show && !$icon.current.contains(event.target) && setShow(false);
    }, [show]);
    const onClickShowDropdown = useCallback(() => {
        setShow((prev) => !prev);
    }, []);
    useClickOutside($block, handleClickOutside);

    const onLogout = () => {
        props.logout();    
    }

    if(!props.isAuth) {
        return <NavLink to="/login">
                <IconUserLoggedOut />                
            </NavLink>
    } else {
        return <>
            <div ref={$icon} className={classes.logged} onClick={onClickShowDropdown}>
                <IconUserLoggedIn classNameIcon={classes.icon} />
                <label className={classes.nameUser2}>{props.userName}</label>
            </div>
            <div id="myDropdown" ref={$block} className={classNames(classes.dropdown_content, {
                [classes.show] : show
            })}>
                <label className={classes.nameUser}>{props.userName}</label>
                <div className={classes.menuItems}>
                    <NavLink className={classes.navLink} to="/adminBoard">AdminBoard</NavLink>
                    <button className={classNames(classes.btnLink, classes.navLink)} onClick={onLogout}>Logout</button>
                </div>
            </div>
        </>
    }    
}

const mapStateToProps = (state) => ({
    userName: state.authMain.userName
}); 

export default connect(mapStateToProps, {logout})(LoggedComponent);