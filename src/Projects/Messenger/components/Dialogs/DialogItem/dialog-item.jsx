import React, { Component } from 'react';

import s from './dialog-item.module.less';
import { NavLink } from 'react-router-dom';

export class DialogItem extends Component {
    render() {
        return (
            <div className={s.dialog}>                
                <NavLink to={`/projects/messenger/dialogs/${this.props.id}`}>
                    <img src='https://yt3.ggpht.com/a/AATXAJwCs3rfMLFb5gC4LKzOGXci5w284N2JIH0-8A=s900-c-k-c0xffffffff-no-rj-mo'/>
                    {this.props.name}                    
                </NavLink>
            </div>
        );
    }
}
