import React from 'react';

import s from './header.module.less';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <div className={s.header}>
            <div>This is messenger</div>
            <div className={s.loginBlock}>
                { props.isAuth 
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div> 
                    : <NavLink to={'/projects/messenger/login'}>Login</NavLink>}
            </div>
        </div>            
    );
}

export default Header;