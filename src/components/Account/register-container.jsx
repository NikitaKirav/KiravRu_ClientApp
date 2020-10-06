import React from 'react';
import RegisterFormRedux from './register.jsx';
import { connect } from 'react-redux';
import { register } from '../../redux/auth-main-reducer.js';
import { Redirect } from 'react-router-dom';

const RegisterContainer = (props) => {

    const registerUser = (values) => {
        props.register(values.Email, values.UserName, values.Password, values.PasswordConfirm);
    }
    
    if(props.isFetching) {
        return <Redirect to={"/login"} />
    }

    return (
        <RegisterFormRedux onSubmit={registerUser} />
    );
}

const mapStateToProps = (state) => ({
    isFetching: state.authMain.isFetching
});

export default connect(mapStateToProps, { register })(RegisterContainer);