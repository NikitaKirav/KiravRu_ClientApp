import React, { Component } from 'react';

import Preloader from '../../../../../components/common/Preloader/preloader';
import ProfileStatusWithHooks from './profile-status-with-hooks.jsx';

export class ProfileInfo extends Component {
    render() {
        if(!this.props.profile) {
            return <Preloader />;
        }
        return (
            <div>
                <div>
                    <img src={this.props.profile.photos.large} />
                    <ProfileStatusWithHooks status={this.props.status} updateStatus={this.props.updateStatus} />
                </div>
            </div>
        );
    }
}