import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../components/common/FormsControls/forms-controls.jsx';
import { NavLink } from 'react-router-dom';

import './login.less';

const Register = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
        <div className="page-wrap">
            <div className="container col-lg-6 home-article">
                <h1>Registration New User</h1>
                {props.error && <div className="formSummaryError">
                    {props.error}
                </div>}
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <Field name="Email" className="form-control" id="exampleInputEmail1" placeholder="Enter Email" component={Input} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Login</label>
                    <Field name="UserName" className="form-control" id="exampleInputUserName1" placeholder="Enter Login" component={Input} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <Field name="Password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" component={Input} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Password Confirm</label>
                    <Field name="PasswordConfirm" type="password" className="form-control" id="exampleInputPassword2" placeholder="Password Confirm" component={Input} />
                </div>
                <button className="btn btn-primary">Registration</button>
            </div>
        </div>
    </form>
    );
} 

let RegisterFormRedux = reduxForm({form: "RegisterForm"})(Register);

export default RegisterFormRedux;