import React, { useEffect } from 'react';
import LoginFormRedux from './login.jsx';
import { connect } from 'react-redux';
import { login, setFetching } from '../../redux/auth-main-reducer.js';
import { Redirect } from 'react-router-dom';

const LoginContainer = (props) => {

    useEffect(() => {
        props.setFetching(false);
    },[])

    const loginUser = (values) => {
        props.login(values.UserName, values.Password, values.RememberMe);
    }
    
    
    if(props.isAuth) {
        return <Redirect to={"/"} />
    }

    return (
        <LoginFormRedux onSubmit={loginUser} />
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.authMain.isAuth
})

export default connect(mapStateToProps, { login, setFetching })(LoginContainer);

