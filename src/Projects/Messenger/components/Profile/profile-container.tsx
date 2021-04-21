import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../../../redux/project-messenger/profile-reducer';

import {Profile} from './profile';
import { match, RouteComponentProps, withRouter } from 'react-router';
import { withAuthRedirect } from '../../hoc/with-auth-redirect';
import { compose } from 'redux';
import { ProfileType } from '../../../../redux/project-messenger/types/types';
import { AppStateType } from '../../../../redux/redux-store';

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    autorizedUserId: string
    isAuth: boolean
}
type PathParamsType = {
    userId: string
}
type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (newStatus: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<string>
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends Component<PropsType> { 

    refreshProfile() {
        let userId: string | null = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.autorizedUserId;
            if(!userId) {
                this.props.history.push("/projects/messenger/login")
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType) {
        if(this.props.match.params.userId != prevProps.match.params.userId)
        this.refreshProfile();
    }

    render() {        
        return (
            <Profile { ...this.props}  profile={this.props.profile} isOwner={!this.props.match.params.userId} 
                savePhoto={this.props.savePhoto} status={this.props.status} updateStatus={this.props.updateStatus} saveProfile={this.props.saveProfile} />
        );
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
  //  withAuthRedirect
    )(ProfileContainer);

