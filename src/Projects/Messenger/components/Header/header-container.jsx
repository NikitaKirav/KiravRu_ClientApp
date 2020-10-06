import React, { Component } from 'react';
import Header from './header.jsx';
import { connect } from 'react-redux';
import { logout } from '../../../../redux/auth-reducer.js';

class HeaderContainer extends Component {
    render() {
        return (
            <Header { ...this.props } />            
        );
    }
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, {logout})(HeaderContainer);