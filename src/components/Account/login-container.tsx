import React, { useEffect } from 'react';
import LoginFormRedux from './login';
import { connect } from 'react-redux';
import { login, actions } from '../../redux/auth-main-reducer';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (userName: string, password: string, rememberMe: boolean) => void
    setFetching: (isFetching: boolean) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType;

export type LoginFormValuesType = {
    userName: string
    password: string
    rememberMe: boolean
}

const LoginContainer: React.FC<PropsType> = (props) => {

    useEffect(() => {
        props.setFetching(false);
    },[])

    const loginUser = (formData: LoginFormValuesType) => {
        props.login(formData.userName, formData.password, formData.rememberMe);
    }
    
    
    if(props.isAuth) {
        return <Redirect to={"/"} />
    }

    return (
        <LoginFormRedux onSubmit={loginUser} />
    );
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.authMain.isAuth
})

export default connect(mapStateToProps, { login, setFetching: actions.setFetching })(LoginContainer);

