import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../common/FormsControls/forms-controls';
import { NavLink } from 'react-router-dom';
import { LoginFormValuesType } from './login-container';

import './login.less';

const Login: React.FC<InjectedFormProps<LoginFormValuesType>> = ({handleSubmit, error}) => {

    return (
    <form onSubmit={handleSubmit}>
        <div className="page-wrap">
            <div className="container col-lg-6">
                <h1>Enter to application</h1>
                <h4>Use a local account to log in.</h4>
                {error && <div className="formSummaryError">
                    {error}
                </div>}
                <div className="form-group">
                    <label>Login</label>
                    <Field name="userName" className="form-control" id="exampleInputEmail1" placeholder="Enter login" component={Input} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <Field name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" component={Input} />
                </div>
                <div className="form-group form-check">
                    <Field name="rememberMe" type="checkbox" className="form-check-input" id="exampleCheck1" component={Input} />
                    <label className="form-check-label">Check me out</label>
                </div>
                <button className="btn btn-primary">Submit</button>
                <NavLink className="register" to="/register">Registration on the site</NavLink>
            </div>
        </div>
    </form>
    );
} 

let LoginFormRedux = reduxForm<LoginFormValuesType>({form: "LoginForm"})(Login);

export default LoginFormRedux;