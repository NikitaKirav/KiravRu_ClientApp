/** Absolute imports */
import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

/** Components */
import { Input } from '../../../components/common/FormsControls/forms-controls';
import { RegisterFormValuesType } from './register-container';

/** Styles */
import classes from '../Login/login.module.less';


const Register: React.FC<InjectedFormProps<RegisterFormValuesType>> = ({handleSubmit, error}) => {
    return (
    <form onSubmit={handleSubmit}>
        <div className={classes.pageWrap}>
            <div className={classNames(classes.container, classes.colLg6)}>
                <h1>Registration New User</h1>
                {error && <div className={classes.formSummaryError}>
                    {error}
                </div>}
                <div className={classes.shift}></div>
                <div className={classes.formGroup}>
                    <label>Email</label>
                    <Field name="email" className={classes.formControl} placeholder="Email" component={Input} />
                </div>
                <div className={classes.formGroup}>
                    <label>Login</label>
                    <Field name="userName" className={classes.formControl} placeholder="Login" component={Input} />
                </div>
                <div className={classes.formGroup}>
                    <label>Password</label>
                    <Field name="password" type="password" className={classes.formControl} placeholder="Password" component={Input} />
                </div>
                <div className={classes.formGroup}>
                    <label>Password Confirm</label>
                    <Field name="passwordConfirm" type="password" className={classes.formControl} placeholder="Password Again" component={Input} />
                </div>
                <div className={classes.shift}></div>
                <button className={classNames(classes.btn, classes.btnPrimary)}>SUBMIT</button>
                <NavLink className={classes.register} to="/login">LogIn on the site</NavLink>
            </div>
        </div>
    </form>
    );
} 

let RegisterFormRedux = reduxForm<RegisterFormValuesType>({form: "RegisterForm"})(Register);

export default RegisterFormRedux;