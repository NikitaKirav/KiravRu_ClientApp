import React, { useState, useRef, useCallback } from 'react';
import useClickOutside from '../../packages/ui/hooks/clickoutside.js';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { IconUserLoggedOut, IconUserLoggedIn } from '../../svg-icons/user-login.jsx';
import s from './logged.module.less';
import { logout } from '../../redux/auth-main-reducer.js';
import { connect } from 'react-redux';

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
            <div ref={$icon} className={s.logged} onClick={onClickShowDropdown}>
                <IconUserLoggedIn classNameIcon={s.icon} />
                <label className={s.nameUser2}>{props.userName}</label>
            </div>
            <div id="myDropdown" ref={$block} className={classNames(s.dropdown_content, {
                [s.show] : show
            })}>
                <label className={s.nameUser}>{props.userName}</label>
                <NavLink className={s.navLink} to="/adminBoard">AdminBoard</NavLink>
                <button className={classNames(s.btnLink, s.NavLink)} onClick={onLogout}>Logout</button>
            </div>
        </>
    }    
}

const mapStateToProps = (state) => ({
    userName: state.authMain.userName
}); 

export default connect(mapStateToProps, {logout})(LoggedComponent);