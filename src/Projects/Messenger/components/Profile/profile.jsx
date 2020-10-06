import React, { Component } from 'react';

import s from './profile.module.less';
import  MyPostsContainer  from './MyPosts/myposts-container.jsx';
import { ProfileInfo } from './ProfileInfo/profile-info.jsx';

export class Profile extends Component {
    render() {
        return (
            <div className='profile'>
                <ProfileInfo profile={this.props.profile} 
                    status={this.props.status} updateStatus={this.props.updateStatus} />
                <MyPostsContainer />
            </div>
        );
    }
}