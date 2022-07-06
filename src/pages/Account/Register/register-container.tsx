/** Absolute imports */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

/** Components */
import RegisterFormRedux from './register';

/** Store */
import { register } from '../../../redux/auth-main-reducer';
import { AppStateType } from '../../../redux/redux-store';

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

    const navigation = useNavigate();
    const registerUser = (formData: RegisterFormValuesType) => {
        props.register(formData.email, formData.userName, formData.password, formData.passwordConfirm);
    }
    
    if(props.isFetching) {
        navigation("/login");
    }

    return (
            <RegisterFormRedux onSubmit={registerUser} />
    );
}

const mapStateToProps = (state: AppStateType) => ({
    isFetching: state.authMain.isFetching
});

export default connect(mapStateToProps, { register })(RegisterContainer);