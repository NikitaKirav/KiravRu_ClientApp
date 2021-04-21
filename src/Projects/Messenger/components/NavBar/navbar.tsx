import React, { Component } from 'react';

import s from './navbar.module.less';
import { NavLink } from 'react-router-dom';
import { FriendType } from '../../../../redux/project-messenger/sidebar-reducer';

type PropsType = {
    friends: Array<FriendType>
}

export class NavBar extends Component<PropsType> {    
    render() {
        let friends = this.props.friends.map(f => 
            <div className={s.friend} key={f.id} >
                <img src='https://yt3.ggpht.com/a/AATXAJwCs3rfMLFb5gC4LKzOGXci5w284N2JIH0-8A=s900-c-k-c0xffffffff-no-rj-mo'/>
                <div>{f.name}</div>
            </div>
        );
        return (
            <nav className={s.nav}>
                <div className={s.item}>
                    <NavLink to="/projects/messenger/profile" activeClassName={s.active}>Profile</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/projects/messenger/dialogs" activeClassName={s.active}>Message</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/projects/messenger/users" activeClassName={s.active}>Users</NavLink>
                </div>
                <div className={s.item}>
                    <a>Music</a>
                </div>
                <div className={s.item}>
                    <a>Settings</a>
                </div>

                <div className={s.friends}>
                    <div>Friends:</div>
                    {friends}
                </div>
            </nav>
        );
    }
}