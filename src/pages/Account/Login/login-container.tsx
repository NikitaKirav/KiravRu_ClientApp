/** Absolute imports */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/** Components */
import LoginFormRedux from './login';

/** Store */
import { login, actions } from '../../../redux/auth-main-reducer';
import { AppStateType } from '../../../redux/redux-store';


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

    const navigation = useNavigate();

    useEffect(() => {
        props.setFetching(false);
    },[])

    const loginUser = (formData: LoginFormValuesType) => {
        props.login(formData.userName, formData.password, formData.rememberMe);
    }
    
    
    if(props.isAuth) {
        navigation("/");
    }

    return (
            <LoginFormRedux onSubmit={loginUser} />
    );
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.authMain.isAuth
})

export default connect(mapStateToProps, { login, setFetching: actions.setFetching })(LoginContainer);

