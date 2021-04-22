import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../common/FormsControls/forms-controls';

import './login.less';
import { RegisterFormValuesType } from './register-container';

const Register: React.FC<InjectedFormProps<RegisterFormValuesType>> = ({handleSubmit, error}) => {
    return (
    <form onSubmit={handleSubmit}>
        <div className="page-wrap">
            <div className="container col-lg-6">
                <h1>Registration New User</h1>
                {error && <div className="formSummaryError">
                    {error}
                </div>}
                <div className="form-group">
                    <label>Email</label>
                    <Field name="email" className="form-control" placeholder="Enter Email" component={Input} />
                </div>
                <div className="form-group">
                    <label>Login</label>
                    <Field name="userName" className="form-control" placeholder="Enter Login" component={Input} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <Field name="password" type="password" className="form-control" placeholder="Password" component={Input} />
                </div>
                <div className="form-group">
                    <label>Password Confirm</label>
                    <Field name="passwordConfirm" type="password" className="form-control" placeholder="Password Confirm" component={Input} />
                </div>
                <button className="btn btn-primary">Registration</button>
            </div>
        </div>
    </form>
    );
} 

let RegisterFormRedux = reduxForm<RegisterFormValuesType>({form: "RegisterForm"})(Register);

export default RegisterFormRedux;