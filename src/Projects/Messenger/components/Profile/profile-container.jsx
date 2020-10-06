import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUserProfile, getStatus, updateStatus } from '../../../../redux/profile-reducer.js';

import {Profile} from './profile.jsx';
import { withRouter } from 'react-router';
import { withAuthRedirect } from '../../hoc/with-auth-redirect.js';
import { compose } from 'redux';

class ProfileContainer extends Component { 

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.autorizedUserId;
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {        
        return (
            <Profile { ...this.props}  profile={this.props.profile} 
                status={this.props.status} updateStatus={this.props.updateStatus} />
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});


export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter,
    withAuthRedirect
    )(ProfileContainer);