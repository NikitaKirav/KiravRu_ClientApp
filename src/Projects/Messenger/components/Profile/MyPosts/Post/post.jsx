import React, { Component } from 'react';

import s from './post.module.less';

export class Post extends Component {
    render() {
        return (
            <div className={s.item}>
                <img src='https://yt3.ggpht.com/a/AATXAJwCs3rfMLFb5gC4LKzOGXci5w284N2JIH0-8A=s900-c-k-c0xffffffff-no-rj-mo'/>
                {this.props.message}
                <div>
                    <span>like {this.props.likesCount}</span>
                </div>
            </div>
        );
    }
}