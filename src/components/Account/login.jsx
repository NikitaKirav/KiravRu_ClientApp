import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../components/common/FormsControls/forms-controls.jsx';
import { NavLink } from 'react-router-dom';

import './login.less';

const Login = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
        <div className="page-wrap">
            <div className="container col-lg-6 home-article">
                <h1>Enter to application</h1>
                <h4>Use a local account to log in.</h4>
                {props.error && <div className="formSummaryError">
                    {props.error}
                </div>}
                <div className="form-group">
                    <label>Login</label>
                    <Field name="UserName" className="form-control" id="exampleInputEmail1" placeholder="Enter login" component={Input} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <Field name="Password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" component={Input} />
                </div>
                <div className="form-group form-check">
                    <Field name="RememberMe" type="checkbox" className="form-check-input" id="exampleCheck1" component={Input} />
                    <label className="form-check-label">Check me out</label>
                </div>
                <button className="btn btn-primary">Submit</button>
                <NavLink className="register" to="/register">Registration on the site</NavLink>
            </div>
        </div>
    </form>
    );
} 

let LoginFormRedux = reduxForm({form: "LoginForm"})(Login);

export default LoginFormRedux;