import React from 'react';
import RegisterFormRedux from './register';
import { connect } from 'react-redux';
import { register } from '../../redux/auth-main-reducer';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';
import Preloader from '../common/Preloader/preloader';

type MapStatePropsType = {
    isFetching: boolean
}
type MapDispatchPropsType = {
    register: (email: string, userName: string, password: string, passwordConfirm: string) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType;

export type RegisterFormValuesType = {
    email: string
    userName: string
    password: string
    passwordConfirm: string
}

const RegisterContainer: React.FC<PropsType> = (props) => {

    const registerUser = (formData: RegisterFormValuesType) => {
        props.register(formData.email, formData.userName, formData.password, formData.passwordConfirm);
    }
    
    if(props.isFetching) {
        return <Redirect to={"/login"} />
    }

    return (
            <RegisterFormRedux onSubmit={registerUser} />
    );
}

const mapStateToProps = (state: AppStateType) => ({
    isFetching: state.authMain.isFetching
});

export default connect(mapStateToProps, { register })(RegisterContainer);