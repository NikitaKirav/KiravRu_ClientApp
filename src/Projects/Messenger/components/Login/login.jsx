import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../../../components/common/FormsControls/forms-controls.jsx';
import { required } from '../../../../utils/validators/validators.js';
import { connect } from 'react-redux';
import { login } from '../../../../redux/auth-reducer.js';
import { Redirect } from 'react-router-dom';
import s from '../../../../components/common/FormsControls/forms-controls.module.css';

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }
    if(props.isAuth) {
        return <Redirect to={"/projects/messenger/profile"} />
    }
    return <div>    
        <h1>Login</h1>
        <LoginReduxForm  onSubmit={onSubmit} />
    </div>
}

const LoginForm = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
        <div><Field placeholder={"Email"} name={"email"} component={Input} 
                    validate={[required]} /></div>
        <div><Field placeholder={"Password"} name={"password"} component={Input} type={"password"} 
                    validate={[required]}/></div>
        <div><Field type={"checkbox"} name={"rememberMe"} component={Input} /> remember me</div>
        {props.error && <div className={s.formSummaryError}>
            {props.error}
        </div>}
        <div><button>Login</button></div>
    </form>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);
