import React, { Component } from 'react';
import ProfileContainer  from './components/Profile/profile-container.jsx';

import { Route } from 'react-router-dom';
import { connect } from "react-redux";
import './messenger.less';
import  DialogsContainer  from './components/Dialogs/dialogs-container.jsx';
import  NavBarContainer  from './components/NavBar/navbar-container.jsx';
import  UsersContainer from './components/Users/users-container.jsx';
import HeaderContainer from './components/Header/header-container.jsx';
import LoginPage from './components/Login/login.jsx';
import { initializeApp}   from '../../redux/app-reducer.js';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import Preloader from '../../components/common/Preloader/preloader.js';

class Messenger extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }    

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return (
                <div className='app_wrapper'>
                    <HeaderContainer />
                    <NavBarContainer />
                    <div className='content'>
                        <Route path='/projects/messenger/profile/:userId?' render={ () => 
                        <ProfileContainer /> } />
                        
                        <Route path='/projects/messenger/dialogs' render={ () => 
                        <DialogsContainer /> } />

                        <Route path='/projects/messenger/users' render={ () =>
                        <UsersContainer /> } />

                        <Route path='/projects/messenger/login' render={ () =>
                        <LoginPage /> } />
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose(
        withRouter,
        connect(mapStateToProps, {initializeApp}))(Messenger);