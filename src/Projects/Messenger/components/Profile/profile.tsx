import React, { Component } from 'react';
import Preloader from '../../../../components/common/Preloader/preloader';
import { ProfileType } from '../../../../redux/project-messenger/types/types';

import  MyPostsContainer  from './MyPosts/myposts-container';
import ProfileInfo from './ProfileInfo/profile-info';

type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    status: any
    updateStatus: (newStatus: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<string>
}

export class Profile extends Component<PropsType> {
    render() {
        if(!this.props.profile) {
            return <Preloader isBlackStyle={false} />;
        }
        return (
            <div className='profile'>
                <ProfileInfo profile={this.props.profile} isOwner={this.props.isOwner} savePhoto={this.props.savePhoto}
                    status={this.props.status} updateStatus={this.props.updateStatus} saveProfile={this.props.saveProfile} />
                <MyPostsContainer />
            </div>
        );
    }
}